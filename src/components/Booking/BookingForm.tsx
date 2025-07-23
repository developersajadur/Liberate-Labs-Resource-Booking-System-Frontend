/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { createBooking } from "@/services/BookingService";

interface BookingFormProps {
  resourceId: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ resourceId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if (new Date(data.endTime) <= new Date(data.startTime)) {
      toast.error("End time must be after start time");
      return;
    }

    const duration =
      (new Date(data.endTime).getTime() - new Date(data.startTime).getTime()) /
      60000;

    if (duration < 15) {
      toast.error("Duration must be at least 15 minutes");
      return;
    }

    try {
      setLoading(true);
      const res = await createBooking({
        resourceId,
        startTime: data.startTime,
        endTime: data.endTime,
        requestedBy: data.requestedBy,
      });

      if (res.success) {
        toast.success("Booking created successfully");
        reset();
      } else {
        toast.error(res.message || "Booking creation failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Book a Resource</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="requestedBy">Your Name</Label>
            <Input
              id="requestedBy"
              type="text"
              placeholder="Your Name"
              {...register("requestedBy", { required: true })}
              className="appearance-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Time */}
            <div className="flex-1 space-y-1">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                {...register("startTime", { required: true })}
                className="appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Time */}
            <div className="flex-1 space-y-1">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                {...register("endTime", { required: true })}
                className="appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Submitting..." : "Book Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
