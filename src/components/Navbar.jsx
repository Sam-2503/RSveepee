import React from 'react';

const Navbar = ({ onAddEvent }) => (
  <div className="navbar bg-base-200 shadow mb-6">
    <div className="flex-1">
      <span className="text-xl font-bold">RSveepee</span>
    </div>
    <div className="flex-none">
      <button className="btn btn-primary" onClick={onAddEvent}>
        Add New Event
      </button>
    </div>
  </div>
);

export default Navbar; 