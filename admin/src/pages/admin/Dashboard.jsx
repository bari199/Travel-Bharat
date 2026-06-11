import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";

import StatsCards from "../../components/dashboard/StatsCards";

import { getDashboardStats } from "../../services/dashboardApi";

import { toast } from "sonner";

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalDestinations: 0,
      totalComments: 0,
      totalRatings: 0,
      totalWishlist: 0,
      totalReactions: 0,
    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await getDashboardStats();

        setStats(res.stats);
      } catch (error) {
        toast.error(
          error?.response?.data?.message
        );
      }
    };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <StatsCards stats={stats} />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="font-bold mb-3">
              Quick Summary
            </h2>

            <p>
              Total Users:{" "}
              {stats.totalUsers}
            </p>

            <p>
              Total Destinations:{" "}
              {stats.totalDestinations}
            </p>

            <p>
              Total Comments:{" "}
              {stats.totalComments}
            </p>

            <p>
              Total Ratings:{" "}
              {stats.totalRatings}
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="font-bold mb-3">
              Platform Activity
            </h2>

            <p>
              Wishlist:
              {" "}
              {stats.totalWishlist}
            </p>

            <p>
              Reactions:
              {" "}
              {stats.totalReactions}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;