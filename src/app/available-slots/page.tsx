import React from "react";
import { getAllResources } from "@/services/ResourceService";
import { TResource } from "@/types/resource.type";
import AvailableSlotsPage from "@/components/AvailableSlot/AvailableSlotsPage";

const Page = async () => {
  const resources: TResource[] = await getAllResources();
  return <AvailableSlotsPage resources={resources} />;
};

export default Page;
