import AdminLayout from "../../components/layout/AdminLayout";
import ReactionTable from "../../components/socials/Reactions/ReactionTable";

const Reactions = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-stone-100">
        Reactions
      </h1>

      <ReactionTable />
    </AdminLayout>
  );
};

export default Reactions;