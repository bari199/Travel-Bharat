import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "../../components/layout/AdminLayout";
import EventsForm from "@/components/events/EventsForm";

const AddEvents = () => {
  const navigate = useNavigate();

  /* ============================================
      Success
  ============================================ */

  const handleSuccess = () => {
    toast.success("Event created successfully.");
    navigate("/events");
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8">
        <EventsForm isEdit={false} onSuccess={handleSuccess} />
      </div>
    </AdminLayout>
  );
};

export default AddEvents;