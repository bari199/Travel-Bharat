import { useEffect, useState } from "react";

import { toast } from "sonner";

import AdminLayout from "../../components/layout/AdminLayout";

import UserTable from "../../components/users/UserTable";

import {
  getUsers,
  deleteUser,
} from "../../services/userApi";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res =
        await getUsers();

      setUsers(res.users);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete =
    async (userId) => {
      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete) return;

      try {
        await deleteUser(userId);

        toast.success(
          "User Deleted"
        );

        fetchUsers();
      } catch (error) {
        toast.error(
          error?.response?.data?.message
        );
      }
    };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Users Management
        </h1>

        <div className="mb-4">
          Total Users:
          <span className="font-bold ml-2">
            {users.length}
          </span>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserTable
            users={users}
            onDelete={
              handleDelete
            }
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;