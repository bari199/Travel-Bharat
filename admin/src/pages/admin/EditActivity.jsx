import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { toast } from "sonner";

import ActivityForm from "@/components/activity/ActivityForm";

import { getActivity } from "@/services/activityApi";

import AdminLayout from "@/components/layout/AdminLayout";

const EditActivity = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivity(id);

        setActivity(response);
      } catch (error) {
        console.error(error);

        toast.error(
          error?.response?.data?.message || "Failed to load activity.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div
      className="
      flex
          items-center
          justify-center
          py-16
          text-lg
        "
      >
        Loading activity...
      </div>
    );
  }

  if (!activity) {
    return (
      <div
      className="
          flex
          items-center
          justify-center
          py-16
          text-lg
          text-red-500
        "
      >
        Activity not found.
      </div>
    );
  }

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
          Edit Activity
        </h1>

        <p
          className="
            text-muted-foreground
            mt-2
          "
        >
          Update the activity information.
        </p>
      </div>

      <ActivityForm initialData={activity} isEdit={true} />
    </div>
    </AdminLayout>
  );
};

export default EditActivity;
