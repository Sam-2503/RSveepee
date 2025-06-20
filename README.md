# RSveepee - An Event Management Platform

A full-stack event management application built with React, Express.js, and PostgreSQL. RSveepee allows users to create, manage, and join events with a modern, responsive interface.

## 🌟 Features

### Authentication

- **User Registration & Login**: Secure authentication with JWT tokens
- **Password Hashing**: Bcrypt for secure password storage

### Event Management

- **Create Events**: Add new events with title, description, and images
- **View Events**: Browse all available events in a responsive grid layout
- **Join Events**: Register for available events
- **Registration Details**: View event information and track registration data

## 🛠️ Tech Stack

### Frontend

- **React** - Front-End framework
- **Tailwind CSS** - CSS Styling framework
- **DaisyUI** - UI component library
- **Axios** - HTTP client for API requests

### Backend

- **Express.js** - Backend framework for Node.js
- **PostgreSQL** - Database (hosted on neon.tech)
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing

## Running it on your machine

### Prerequisites

- Node.js (latest version)
- npm
- PostgreSQL database (Neon or local)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sam-2503/RSveepee.git
   cd RSveepee
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Database Setup**
   The application automatically creates the required tables on startup. Ensure your PostgreSQL database is accessible.

### Running the Application

#### Development Mode

```bash
# Start the backend server (runs on port 4000)
npm start

# In another terminal, start the frontend development server
npm run dev
```

#### Production Build

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview
```

## 🎨 UI Components

### EventCard

Displays event information in a card format with:

- Event image (or placeholder)
- Title and description
- "JOIN US" button
- "Registration Data" button

### Modals

- **AddEventModal**: Form to create new events
- **JoinFormModal**: Registration form for events
- **EventDetailsModal**: Shows event details and registrant list

### Authentication Pages

- **Login**: User authentication
- **Register**: New user registration

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes requiring authentication
- CORS configuration for API security
- Environment variable protection for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

Created by [Sam-2503](https://github.com/Sam-2503)

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues](https://github.com/Sam-2503/RSveepee/issues) page.

---

**RSveepee**
