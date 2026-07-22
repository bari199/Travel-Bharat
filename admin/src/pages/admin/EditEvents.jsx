import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import AdminLayout from "@/components/layout/AdminLayout";
import EventsForm from "@/components/events/Eventsform";

import { getEvent } from "@/services/eventsApi";

const EditEvents = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  /* ============================================
      Fetch Event
  ============================================ */

  const fetchEvent = async () => {
    try {
      const res = await getEvent(id);
      const data = res.event;

      // Map the backend document shape to the flat shape EventsForm
      // (and EvsectionsBasicInfo) actually reads from.
      setEvent({
        ...data,
        destination: data.destination?._id || data.destination || "",
        eventDate: data.eventDate
          ? new Date(data.eventDate).toISOString().slice(0, 10)
          : "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  /* ============================================
      Success
  ============================================ */

  const handleSuccess = () => {
    // EventsForm already toasts success internally on update,
    // so we only handle navigation here.
    navigate("/events");
  };

  /* ============================================
      Render
  ============================================ */

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8">
        <EventsForm
          isEdit={true}
          eventId={id}
          initialData={event}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default EditEvents;