import { useEffect, useState } from "react";

import { toast } from "sonner";

import ActivityTable from "@/components/activity/ActivityTable";

import { getActivities } from "@/services/activityApi";

import AdminLayout from "@/components/layout/AdminLayout";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const response = await getActivities();

      console.log("Full Response:", response);
      console.log("Activities:", response.activities);

      setActivities(response.activities || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch activities.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <AdminLayout>
      <div
        className="
        space-y-6
      "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Activities
          </h1>

          <p
            className="
            text-muted-foreground
            mt-2
          "
          >
            Manage destination activities.
          </p>
        </div>

        <ActivityTable
          data={activities}
          loading={loading}
          onDeleteSuccess={fetchActivities}
        />
      </div>
    </AdminLayout>
  );
};

export default Activities;
