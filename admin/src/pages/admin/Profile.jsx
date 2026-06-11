import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";

import { getAdminProfile } from "../../services/userApi";

const Profile = () => {
  const [admin, setAdmin] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      const res =
        await getAdminProfile();

      setAdmin(res.admin);
    };

  return (
    <AdminLayout>
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-6">
          Admin Profile
        </h1>

        <div className="border rounded-lg p-6">
          <p>
            <strong>Email:</strong>{" "}
            {admin?.email}
          </p>

          <p className="mt-3">
            <strong>Role:</strong>
            {" "}Admin
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;