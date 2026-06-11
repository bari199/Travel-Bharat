import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";

import {
  getRatings,
  deleteRating,
} from "../../services/ratingApi";

const Ratings = () => {
  const [ratings, setRatings] =
    useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings =
    async () => {
      try {
        const res =
          await getRatings();

        setRatings(
          res.ratings
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
          "Delete rating?"
        )
      )
        return;

      try {
        await deleteRating(id);

        toast.success(
          "Rating deleted"
        );

        fetchRatings();
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
        Ratings
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Destination</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {ratings.map(
              (rating) => (
                <tr
                  key={rating._id}
                >
                  <td>
                    {
                      rating.user
                        ?.username
                    }
                  </td>

                  <td>
                    {
                      rating
                        .destination
                        ?.name
                    }
                  </td>

                  <td>
                    {rating.rating}
                  </td>

                  <td>
                    {new Date(
                      rating.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDelete(
                          rating._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Ratings;