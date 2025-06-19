import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import JoinFormModal from "./components/JoinFormModal";
import AddEventModal from "./components/AddEventModal";
import EventDetailsModal from "./components/EventDetailsModal";

const API_URL = "http://localhost:4000";

function EventListPage() {
  const [events, setEvents] = useState([]);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsEventId, setDetailsEventId] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/events`).then((res) => {
      setEvents(res.data);
    });
  }, []);

  // Debug log for modal state
  console.log(
    "detailsModalOpen:",
    detailsModalOpen,
    "detailsEventId:",
    detailsEventId
  );

  const handleAddEvent = () => {
    setAddEventModalOpen(true);
  };

  const handleAddEventSubmit = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/events`, formData);
      setEvents((prev) => [...prev, res.data]);
      setAddEventModalOpen(false);
    } catch (err) {
      alert("Failed to add event");
    }
  };

  const handleAddEventClose = () => {
    setAddEventModalOpen(false);
  };

  const handleJoin = (event) => {
    setSelectedEvent(event);
    setJoinModalOpen(true);
  };

  const handleJoinSubmit = async (formData) => {
    if (!selectedEvent) return;
    try {
      await axios.post(`${API_URL}/events/${selectedEvent.id}/join`, formData);
      alert("Successfully joined event!");
      setJoinModalOpen(false);
      setTimeout(() => setSelectedEvent(null), 300);
    } catch (err) {
      alert("Failed to join event");
    }
  };

  const handleJoinClose = () => {
    setJoinModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const handleDetails = (event) => {
    console.log("Details clicked for event:", event);
    setDetailsEventId(event.id);
    setDetailsModalOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsModalOpen(false);
    setDetailsEventId(null);
  };

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar onAddEvent={handleAddEvent} />
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 justify-items-center">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onJoin={handleJoin}
              onDetails={handleDetails}
            />
          ))}
        </div>
      </div>
      <JoinFormModal
        open={joinModalOpen}
        onClose={handleJoinClose}
        onSubmit={handleJoinSubmit}
        event={selectedEvent}
      />
      <AddEventModal
        open={addEventModalOpen}
        onClose={handleAddEventClose}
        onSubmit={handleAddEventSubmit}
      />
      <EventDetailsModal
        open={detailsModalOpen}
        onClose={handleDetailsClose}
        eventId={detailsEventId}
      />
    </div>
  );
}

export default EventListPage;
