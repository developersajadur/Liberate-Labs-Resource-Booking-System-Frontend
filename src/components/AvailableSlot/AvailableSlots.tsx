"use client";

import React from "react";

interface Slot {
  startTime: string;
  endTime: string;
}

interface Props {
  slots: Slot[] | null;
  loading: boolean;
  error: string | null;
}

const AvailableSlots: React.FC<Props> = ({ slots, loading, error }) => {
  if (loading) return <p>Loading available slots...</p>;

  if (error) return <p className="text-red-600">Error: {error}</p>;

  if (!slots || slots.length === 0) {
    return <p>No available slots found for the selected criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {slots.map((slot, idx) => (
        <div key={idx} className="border p-4 rounded shadow-sm bg-white">
          <p>
            <strong>Start:</strong> {new Date(slot.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End:</strong> {new Date(slot.endTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AvailableSlots;
