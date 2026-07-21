import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import AdminLayout from "@/components/layout/AdminLayout";
import ExperienceForm from "@/components/experiences/ExperienceForm";

import { getExperience } from "@/services/experienceApi";

const EditExperience = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  /* ============================================
      Fetch Experience
  ============================================ */

  const fetchExperience = async () => {
    try {
      const res = await getExperience(id);

      const data = res.experience;
      console.log(data.images);

      // Map the backend document shape to the flat shape ExperienceForm
      // (and ExperienceBasicInfoSection) actually reads from.
      setExperience({
        ...data,
        destination: data.destination?._id || data.destination || "",
        offer: data.priceRange || "",
        featured: data.icon === true || data.icon === "true",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  /* ============================================
      Success
  ============================================ */

  const handleSuccess = () => {
    // ExperienceForm already toasts success internally on update,
    // so we only handle navigation here.
    navigate("/experiences");
  };

  /* ============================================
      Render
  ============================================ */

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8">
        <ExperienceForm
          isEdit={true}
          experienceId={id}
          initialData={experience}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default EditExperience;