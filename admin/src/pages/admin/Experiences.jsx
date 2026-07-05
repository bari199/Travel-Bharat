import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  getExperiences,
  deleteExperience,
} from "@/services/experienceApi";

import ExperienceTable from "@/components/experiences/ExperienceTable";

import AdminLayout from "@/components/layout/AdminLayout";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchExperiences = async () => {
    try {
      const res = await getExperiences();

      setExperiences(res.experiences || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch experiences."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);

      toast.success("Experience deleted successfully. ");

      fetchExperiences();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete experience."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-orange-600 font-bold">Experiences</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ExperienceTable
            experiences={experiences}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Experiences;