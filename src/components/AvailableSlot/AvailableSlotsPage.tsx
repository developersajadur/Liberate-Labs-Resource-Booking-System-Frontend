/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { getAvailableSlots } from "@/services/BookingService";
import { TResource } from "@/types/resource.type";
import AvailableSlotsFilterBar from "@/components/AvailableSlot/AvailableSlotsFilterBar";
import AvailableSlots from "@/components/AvailableSlot/AvailableSlots";

interface Props {
  resources: TResource[];
}

const AvailableSlotsPage: React.FC<Props> = ({ resources }) => {
  const [slots, setSlots] = useState<
    null | { startTime: string; endTime: string }[]
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async (
    resourceId: string,
    date: string,
    duration: string
  ) => {
    setLoading(true);
    setError(null);
    setSlots(null);

    try {
      const data = await getAvailableSlots(resourceId, date, duration);
      setSlots(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch available slots");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Slots</h1>
      <AvailableSlotsFilterBar resources={resources} onFilter={handleFilter} />
      <AvailableSlots slots={slots} loading={loading} error={error} />
    </div>
  );
};

export default AvailableSlotsPage;
