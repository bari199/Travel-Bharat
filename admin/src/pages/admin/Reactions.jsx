import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";

import {
  getReactions,
  deleteReaction,
} from "../../services/reactionApi";

const Reactions = () => {
  const [reactions, setReactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchReactions();
  }, []);

  const fetchReactions =
    async () => {
      try {
        setLoading(true);

        const res =
          await getReactions();

        setReactions(
          res.reactions || []
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to load reactions"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this reaction?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteReaction(id);

        toast.success(
          "Reaction deleted"
        );

        fetchReactions();
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Reactions
        </h1>

        {loading ? (
          <p>
            Loading reactions...
          </p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-3 text-left">
                    User
                  </th>

                  <th className="p-3 text-left">
                    Comment
                  </th>

                  <th className="p-3 text-left">
                    Type
                  </th>

                  <th className="p-3 text-left">
                    Date
                  </th>

                  <th className="p-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {reactions.map(
                  (reaction) => (
                    <tr
                      key={
                        reaction._id
                      }
                      className="border-b"
                    >
                      <td className="p-3">
                        {
                          reaction.user
                            ?.username
                        }
                      </td>

                      <td className="p-3">
                        {
                          reaction
                            .comment
                            ?.message
                        }
                      </td>

                      <td className="p-3 capitalize">
                        {
                          reaction.type
                        }
                      </td>

                      <td className="p-3">
                        {new Date(
                          reaction.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            handleDelete(
                              reaction._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
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
        )}
      </div>
    </AdminLayout>
  );
};

export default Reactions;