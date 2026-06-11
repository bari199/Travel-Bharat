import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";

import {
  getWishlist,
  deleteWishlist,
} from "../../services/wishlistApi";

const Wishlist = () => {
  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
    async () => {
      try {
        const res =
          await getWishlist();

        setWishlist(
          res.wishlist
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message
        );
      }
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete wishlist item?"
        )
      )
        return;

      try {
        await deleteWishlist(id);

        toast.success(
          "Wishlist removed"
        );

        fetchWishlist();
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message
        );
      }
    };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Wishlist
      </h1>

      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg"
          >
            <p>
              User:
              {" "}
              {
                item.user
                  ?.username
              }
            </p>

            <p>
              Destination:
              {" "}
              {
                item
                  .destination
                  ?.name
              }
            </p>

            <button
              onClick={() =>
                handleDelete(
                  item._id
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Wishlist;