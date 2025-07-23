"use server";

import { revalidateTag } from "next/cache";
import { BASE_API_URL } from "..";

export const createBooking = async (bookingData: {
  resourceId: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
}) => {
  try {
    const response = await fetch(`${BASE_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    revalidateTag("BOOKINGS");

    return response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
};

export const getBookingsWithQuery = async (query: string = "") => {
  try {
    const response = await fetch(`${BASE_API_URL}/bookings?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { tags: ["BOOKINGS"] }, // provide the tag here
    });

    const data = await response.json();

    // DO NOT call revalidateTag here (not allowed)

    return data.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Revalidate bookings tag after mutation
    revalidateTag("BOOKINGS");

    return response.json();
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw new Error("Failed to cancel booking");
  }
};

export const getAvailableSlots = async (
  resourceId: string,
  date: string,
  duration: string
) => {
  try {
    // console.log(date, duration, resourceId);
    const response = await fetch(
      `${BASE_API_URL}/available-slots?resourceId=${resourceId}&date=${date}&duration=${duration}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw new Error("Failed to fetch available slots");
  }
};
