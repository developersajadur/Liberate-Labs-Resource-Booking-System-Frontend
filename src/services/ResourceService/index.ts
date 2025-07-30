"use server";

import { revalidateTag } from "next/cache";
import { BASE_API_URL } from "..";

export const getAllResources = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/resources`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["RESOURCES"] },
    });

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw new Error("Failed to fetch resources");
  }
};

export const createResource = async (resourceData: { name: string }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resourceData),
    });
    revalidateTag("RESOURCES");
    return response.json();
  } catch (error) {
    console.error("Error creating resource:", error);
    throw new Error("Failed to create resource");
  }
};
