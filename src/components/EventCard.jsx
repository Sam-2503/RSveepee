import React from "react";

const truncate = (str, n) =>
  str && str.length > n ? str.slice(0, n) + "..." : str;

const EventCard = ({ event, onJoin, onDetails }) => (
  <div className="flex flex-col items-center bg-base-200 rounded-lg shadow p-4 w-full max-w-xs">
    {event.image ? (
      <img
        src={event.image}
        alt={event.title}
        className="w-32 h-32 object-cover rounded mb-4"
      />
    ) : (
      <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded mb-4 text-gray-500">
        No Image
      </div>
    )}
    <div className="font-semibold mb-1 text-center">{event.title}</div>
    {event.description && (
      <div className="text-sm text-gray-600 mb-2 text-center">
        {truncate(event.description, 60)}
      </div>
    )}
    <button
      className="btn btn-secondary w-full mb-2"
      onClick={() => onJoin(event)}
    >
      JOIN US
    </button>
    {typeof onDetails === "function" && (
      <button
        className="btn btn-outline btn-sm w-full"
        onClick={() => onDetails(event)}
      >
        Details
      </button>
    )}
  </div>
);

export default EventCard;
