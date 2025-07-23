"use client";

import React from "react";
import { TResource } from "@/types/resource.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/Booking/BookingForm";

interface ResourceCardProps {
  resource: TResource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const formattedDate = new Date(resource.createdAt).toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-2xl border bg-card text-card-foreground shadow-sm p-6 w-full max-w-md mx-auto hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-2 text-primary">{resource.name}</h2>
          <p className="text-muted-foreground text-sm">
            Available from:{" "}
            <span className="font-medium text-foreground">{formattedDate}</span>
          </p>
        </div>
      </DialogTrigger>

      <DialogContent
        className="max-w-2xl sm:rounded-lg bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Book “{resource.name}”</DialogTitle>
        </DialogHeader>

        <BookingForm resourceId={resource.id} />
      </DialogContent>
    </Dialog>
  );
};

export default ResourceCard;
