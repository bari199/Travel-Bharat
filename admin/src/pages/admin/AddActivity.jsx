import ActivityForm from "@/components/activity/ActivityForm";
import AdminLayout from "@/components/layout/AdminLayout";

const AddActivity = () => {
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
            Add Activity
          </h1>

          <p
            className="
            text-muted-foreground
            mt-2
          "
          >
            Create a new activity for a destination.
          </p>
        </div>

        <ActivityForm />
      </div>
    </AdminLayout>
  );
};

export default AddActivity;
