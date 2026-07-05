import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";

import CommentTable from "../../components/socials/comments/CommentsTable";

import {
  getComments,
  deleteComment,
} from "../../services/commentApi";

const Comments = () => {
  const [comments, setComments] =
    useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments =
    async () => {
      try {
        const res =
          await getComments();

        setComments(
          res.comments
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
          "Delete comment?"
        )
      )
        return;

      try {
        await deleteComment(id);

        toast.success(
          "Comment deleted"
        );

        fetchComments();
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
        Comments
      </h1>

      <CommentTable
        comments={comments}
        onDelete={
          handleDelete
        }
      />
    </AdminLayout>
  );
};

export default Comments;