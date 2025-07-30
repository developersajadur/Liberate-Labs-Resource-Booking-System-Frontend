"use client"

import { TBooking } from "@/types/booking.type";
import { Button } from "../ui/button";
import { cancelBooking } from "@/services/BookingService";
import { toast } from "sonner";
import { useState } from "react";

const Bookings = ({ bookings }: { bookings: TBooking[] }) => {
  const [cancellingIds, setCancellingIds] = useState<string[]>([]);

  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-500">No bookings found.</p>;
  }

  const handleCancel = async (id: string) => {
    if (cancellingIds.includes(id)) return;

    setCancellingIds((prev) => [...prev, id]);

    try {
      const res = await cancelBooking(id);
      if (res.success) {
        toast.success("Booking cancelled successfully");
      } else {
        toast.error(res.message || "Failed to cancel booking");
        console.error("Failed to cancel booking:", res.error);
      }
    } catch (error) {
      toast.error("An error occurred while cancelling booking");
      console.error("Error cancelling booking:", error);
    } finally {
      setCancellingIds((prev) => prev.filter((cancelId) => cancelId !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-1">{booking.resource.name}</h2>
            <p><strong>Requested By:</strong> {booking.requestedBy}</p>
            <p><strong>Start:</strong> {new Date(booking.startTime).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(booking.endTime).toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-blue-600">{booking.status}</span>
            </p>
          </div>

          <div className="mt-4">
            <Button
              
              onClick={() => handleCancel(booking.id)}
              disabled={cancellingIds.includes(booking.id)}
              className="w-fit bg-red-500 hover:bg-red-600 text-white"
            >
              {cancellingIds.includes(booking.id) ? "Cancelling..." : "Cancel"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
