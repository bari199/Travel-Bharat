import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "../../components/layout/AdminLayout";
import ExperienceForm from "@/components/experiences/ExperienceForm";

const AddExperience = () => {
  const navigate = useNavigate();

  /* ============================================
      Success
  ============================================ */

  const handleSuccess = () => {
    toast.success("Experience created successfully.");

    navigate("/experiences");
  };

  return (
    <AdminLayout>
      <div
        className="
        max-w-7xl
        mx-auto
        py-8
      "
      >
        <ExperienceForm isEdit={false} onSuccess={handleSuccess} />
      </div>
    </AdminLayout>
  );
};

export default AddExperience;
