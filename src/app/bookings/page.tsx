import Bookings from "@/components/Booking/Bookings";
import FilterBar from "@/components/Booking/FilterBar";
import { getBookingsWithQuery } from "@/services/BookingService";
import { getAllResources } from "@/services/ResourceService";

type SearchParamsType = {
  [key: string]: string | string[] | undefined;
};

const BookingsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsType>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const params = new URLSearchParams();

  if (resolvedSearchParams) {
    for (const key in resolvedSearchParams) {
      const value = resolvedSearchParams[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    }
  }

  const query = params.toString();

  const bookings = await getBookingsWithQuery(query);
  const resources = await getAllResources();

  return (
    <div className="p-4 space-y-6">
      <FilterBar resources={resources} />
      <Bookings bookings={bookings} />
    </div>
  );
};

export default BookingsPage;
