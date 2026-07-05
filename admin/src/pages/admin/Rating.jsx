import AdminLayout from "../../components/layout/AdminLayout";
import RatingTable from "../../components/socials/ratings/RatingTable";

const Ratings = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-stone-100">
        Ratings
      </h1>

      <RatingTable />
    </AdminLayout>
  );
};

export default Ratings;