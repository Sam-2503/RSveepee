import React, { useState, useEffect } from "react";

const AddEventModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  useEffect(() => {
    if (open) setForm({ title: "", description: "", image: "" });
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", description: "", image: "" });
  };

  if (!open) return null;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Add New Event</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            className="input input-bordered"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="textarea textarea-bordered"
            placeholder="Event Description (optional)"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="url"
            name="image"
            className="input input-bordered"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
          />
          <div className="modal-action flex gap-2 justify-end mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
