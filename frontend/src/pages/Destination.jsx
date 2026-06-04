import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import LoginDialog from "@/pages/LoginDialog";
import DestinationHero from "@/components/destination/DestinationHero";
import DestinationDescription from "@/components/destination/DestinationDescription";
import TourInfoCards from "@/components/destination/TourInfoCards";
import TourMap from "@/components/destination/TourMap";
import BestExperiences from "@/components/destination/BestExperiences";
import CommentsSection from "@/components/destination/CommentsSection";
import Footer from "@/components/Home/Footer";

const Destination = () => {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  const fetchSingleDestination = async () => {
    try {
      const res = await api.get(`/destinations/${id}`);

      setDestination(res.data.destination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleDestination();
  }, [id]);

  if (!destination) {
    return <h1 className="text-center py-20 text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div>
      <DestinationHero destination={destination} setOpenLogin={setOpenLogin} />

      <TourInfoCards destination={destination} />

      <DestinationDescription destination={destination} />

      <BestExperiences destination={destination} />

      <TourMap destination={destination} />

      <CommentsSection destinationId={destination._id} />

      <LoginDialog
        open={openLogin}
        setOpen={setOpenLogin}
        showTrigger={false}
      />

      <Footer />
    </div>
  );
};

export default Destination;
