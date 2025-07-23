"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TResource } from "@/types/resource.type";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  resources: TResource[];
};

const FilterBar = ({ resources }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialResourceId = searchParams.get("resourceId") || "";
  const initialDate = searchParams.get("date") || "";

  const [resourceId, setResourceId] = useState(initialResourceId);
  const [date, setDate] = useState(initialDate);

  const handleFilter = () => {
    const selectedResource = resources.find((r) => r.id === resourceId);
    const resourceName = selectedResource?.name || "";

    const params = new URLSearchParams();

    if (resourceId) {
      params.set("resourceId", resourceId);
    }

    if (resourceName) {
      params.set("resourceName", resourceName);
    }

    if (date) {
      params.set("date", date);
    }

    router.push(`/bookings?${params.toString()}`);
  };

  const handleClear = () => {
    setResourceId("");
    setDate("");
    router.push("/bookings");
  };

  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Resource Selector */}
      <div className="flex flex-col space-y-1">
        <Label htmlFor="resource">Resource</Label>
        <Select value={resourceId} onValueChange={setResourceId}>
          <SelectTrigger className="w-[200px]">
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

      {/* Date Picker */}
      <div className="flex flex-col space-y-1">
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          className="w-[200px]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleFilter}>Filter</Button>
      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleClear}>
        Clear Filter
      </Button>
    </div>
  );
};

export default FilterBar;
