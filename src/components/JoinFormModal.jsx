import React, { useState, useEffect } from 'react';

const JoinFormModal = ({ open, onClose, onSubmit, event }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (open) setForm({ name: '', email: '', phone: '' });
  }, [open, event]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '', phone: '' });
  };

  if (!open) return null;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Join {event?.title}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            className="input input-bordered"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="input input-bordered"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            className="input input-bordered"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <div className="modal-action flex gap-2 justify-end mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinFormModal; 