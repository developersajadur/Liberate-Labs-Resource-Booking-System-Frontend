export type TBooking = {
  id: string;
  resourceId: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
  createdAt: string;
  status: string;
  resource: {
    id: string;
    name: string;
  };
};
