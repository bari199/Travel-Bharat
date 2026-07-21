import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "@/services/eventsApi";

import EventsTable from "@/components/events/EventsTable";

import AdminLayout from "@/components/layout/AdminLayout";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.events || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully.");
      fetchEvents();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete event.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-orange-600 font-bold">Events</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <EventsTable events={events} onDelete={handleDelete} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Events;