import { getAllResources } from "@/services/ResourceService";
import React from "react";
import ResourceCard from "../Resource/ResourceCard";
import { TResource } from "@/types/resource.type";

const HomeResource = async () => {
  const resources: TResource[] = await getAllResources();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">All Resources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default HomeResource;
