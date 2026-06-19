import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import DestinationForm from "../../components/destination/DestinationForm";
import { createDestination } from "../../services/destinationApi";

const AddDestination = () => {
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

    featured: false,

    images: [],

    placeImages: [],

    highlights: [""],
    seasonGuide: {
      summer: {
        months: "",
        essentials: [],
      },

      monsoon: {
        months: "",
        essentials: [],
      },

      winter: {
        months: "",
        essentials: [],
      },
    },

    bestExperiences: [
      {
        title: "",
        subtitle: "",
        description: "",
        location: "",
        distance: "",
        bestTime: "",
        duration: "",
        offer: "",
        highlights: [],
        image: null,
        buttonLink: "",
      },
    ],

    nearbyAttractions: [
      {
        title: "",
        description: "",
        distance: "",
        bestTime: "",
        highlights: [],
        image: null,
        mapLink: "",
      },
    ],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createDestination(formData);

      toast.success("Destination Created");
      navigate("/destinations");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Add Destination</h1>

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

export default AddDestination;
