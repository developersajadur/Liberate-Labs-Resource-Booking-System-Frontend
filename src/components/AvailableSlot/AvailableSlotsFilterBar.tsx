"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TResource } from "@/types/resource.type";

interface Props {
  resources: TResource[];
  onFilter: (resourceId: string, date: string, duration: string) => void;
}

const AvailableSlotsFilterBar: React.FC<Props> = ({ resources, onFilter }) => {
  const [resourceId, setResourceId] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceId || !date || !duration) {
      alert("Please fill all filter fields");
      return;
    }
    onFilter(resourceId, date, duration);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 items-end"
      noValidate
    >
      <div className="flex flex-col space-y-1">
        <Label htmlFor="resource">Resource</Label>
        <Select value={resourceId} onValueChange={setResourceId}>
          <SelectTrigger className="w-[200px]" id="resource">
            <SelectValue placeholder="Select Resource" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {resources.map((res) => (
              <SelectItem key={res.id} value={res.id}>
                {res.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-[180px]"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          type="number"
          id="duration"
          min={30}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g. 30"
          className="w-[140px]"
          required
        />
      </div>

      <Button type="submit" className="w-fit bg-blue-500 hover:bg-blue-600">
        Search
      </Button>
    </form>
  );
};

export default AvailableSlotsFilterBar;
