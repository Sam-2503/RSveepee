import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";

const EventDetailsModal = ({ open, onClose, eventId }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && eventId) {
      setLoading(true);
      setError("");
      axios
        .get(`${API_URL}/events/${eventId}/details`)
        .then((res) => {
          setDetails(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load event details");
          setLoading(false);
        });
    } else {
      setDetails(null);
    }
  }, [open, eventId]);

  if (!open) return null;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : details ? (
          <>
            <h3 className="font-bold text-xl mb-2 text-center">
              {details.title}
            </h3>
            {details.image && (
              <img
                src={details.image}
                alt={details.title}
                className="w-48 h-48 object-cover rounded mx-auto mb-4"
              />
            )}
            <div className="mb-2 text-center text-gray-700">
              {details.description}
            </div>
            <div className="mb-4 text-center font-semibold">
              Registrations: {details.registrations?.length || 0}
            </div>
            {details.registrations && details.registrations.length > 0 && (
              <div>
                <div className="font-semibold mb-2">Registrants:</div>
                <ul className="max-h-40 overflow-y-auto">
                  {details.registrations.map((r, i) => (
                    <li key={i} className="border-b py-1 text-sm">
                      {r.name} ({r.email}, {r.phone})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EventDetailsModal;
