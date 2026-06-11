import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getDestinations, deleteDestination } from "../../services/destinationApi";

import DestinationTable from "../../components/destination/DestinationTable";

import AdminLayout from "../../components/layout/AdminLayout";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDestinations = async () => {
    try {
      const res = await getDestinations();

      setDestinations(res.destinations || []);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDestination(id);

      toast.success("Destination Deleted");

      fetchDestinations();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Destinations</h1>

          <Button onClick={() => navigate("/destinations/add")}>
            Add Destination
          </Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <DestinationTable
            destinations={destinations}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Destinations;
