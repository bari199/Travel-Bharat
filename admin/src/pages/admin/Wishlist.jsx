import AdminLayout from "../../components/layout/AdminLayout";
import WishlistTable from "../../components/socials/wishlist/WishlistTable";

const Wishlist = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-stone-100">
        Wishlist
      </h1>

      <WishlistTable />
    </AdminLayout>
  );
};

export default Wishlist;