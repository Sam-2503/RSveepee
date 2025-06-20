import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Use environment variable or fallback to placeholder
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:YOUR_PASSWORD@ep-damp-queen-a1qdmt5h-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(connectionString);

// Table creation logic
async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS event_joins (
      id SERIAL PRIMARY KEY,
      event_id INTEGER REFERENCES events(id),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    );
  `;
  console.log('Ensured tables exist');
}

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) return res.status(409).json({ error: 'Email already registered' });
    const password_hash = await bcrypt.hash(password, 10);
    const result = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${password_hash})
      RETURNING id, name, email
    `;
    const user = result[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const users = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email}`;
    if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /events
app.get('/events', async (req, res) => {
  try {
    const result = await sql`SELECT id, title, description, image FROM events ORDER BY id`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /events
app.post('/events', async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const result = await sql`
      INSERT INTO events (title, description, image)
      VALUES (${title}, ${description}, ${image})
      RETURNING id, title, description, image
    `;
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// POST /events/:id/join
app.post('/events/:id/join', async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { name, email, phone } = req.body;
  try {
    await sql`
      INSERT INTO event_joins (event_id, name, email, phone)
      VALUES (${eventId}, ${name}, ${email}, ${phone})
    `;
    res.status(201).json({ message: 'Joined event', eventId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join event' });
  }
});

// GET /events/:id/details
app.get('/events/:id/details', async (req, res) => {
  const eventId = parseInt(req.params.id);
  try {
    const events = await sql`SELECT id, title, description, image FROM events WHERE id = ${eventId}`;
    if (events.length === 0) return res.status(404).json({ error: 'Event not found' });
    const event = events[0];
    const registrations = await sql`SELECT name, email, phone FROM event_joins WHERE event_id = ${eventId}`;
    res.json({ ...event, registrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// Serve static files from the React build
app.use(express.static(join(__dirname, 'dist')));

// Catch-all handler to serve index.html for any route not handled by the API
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Ensure tables, then start server
(async () => {
  try {
    await ensureTables();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to ensure tables or start server:', err);
    process.exit(1);
  }
})(); 