import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";
import DestinationForm from "../../components/destination/DestinationForm";

import {
  getDestination,
  updateDestination,
} from "../../services/destinationApi";

const EditDestination = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    state: "",
    city: "",
    category: "",
    location: "",
    shortDescription: "",
    description: "",
    bestTimeToVisit: "",
    entryFee: "",

    images: [""],

    placeImages: [""],

    highlights: [""],

    bestExperiences: [
      {
        title: "",
        description: "",
        image: "",
        buttonLink: "",
      },
    ],

    nearbyAttractions: [
      {
        title: "",
        description: "",
        image: "",
        mapLink: "",
      },
    ],

    featured: false,
  });

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    try {
      const res = await getDestination(id);

      setFormData({
        name: res.destination?.name || "",
        title: res.destination?.title || "",
        state: res.destination?.state || "",
        city: res.destination?.city || "",
        category: res.destination?.category || "",
        location: res.destination?.location || "",
        shortDescription: res.destination?.shortDescription || "",
        description: res.destination?.description || "",
        bestTimeToVisit: res.destination?.bestTimeToVisit || "",
        entryFee: res.destination?.entryFee || "",

        images: res.destination?.images || [""],

        placeImages: res.destination?.placeImages || [""],

        highlights: res.destination?.highlights || [""],

        bestExperiences: res.destination?.bestExperiences || [],

        nearbyAttractions: res.destination?.nearbyAttractions || [],

        featured: res.destination?.featured || false,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateDestination(id, formData);

      toast.success("Destination Updated");

      navigate("/destinations");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Edit Destination</h1>

        <DestinationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default EditDestination;
