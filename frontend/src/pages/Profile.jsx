import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";

import ProfileSidebar from "@/components/profile/layout/ProfileSidebar";
import ProfileHeader from "@/components/profile/layout/ProfileHeader";
import ProfileContent from "@/components/profile/layout/ProfileContent";

import useProfile from "@/hooks/userProfile";
import { logout } from "@/services/authService";
import { getData } from "@/context/userContext";
import { NAV_ITEMS } from "@/components/profile/constant/profileNav";

/* =========================================
   Loading Skeleton
========================================= */

const ProfileSkeleton = () => (
  <div className="flex h-screen">
    <div className="w-64 border-r p-5 space-y-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-48" />
    </div>

    <div className="flex-1 p-8 space-y-6">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = getData();

  const [activeTab, setActiveTab] = useState("overview");

  const {
    user,
    loading,
    saved,
    reviews,
    ratings,
    activity,
    stats,
    handleProfileUpdate,
    handlePasswordChange,
    handleRemoveWishlist,
  } = useProfile();

  const activeNav = NAV_ITEMS.find((item) => item.key === activeTab);

  const handleLogout = async () => {
    try {
      const data = await logout();

      localStorage.clear();
      setUser(null);

      toast.success(data?.message || "Logged out successfully");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/20">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar>
          <ProfileSidebar
            user={user}
            stats={stats}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navItems={NAV_ITEMS}
            onLogout={handleLogout}
          />
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          <ProfileHeader activeNav={activeNav} />

          <main className="p-5 sm:p-7">
            <ProfileContent
              activeTab={activeTab}
              user={user}
              wishlist={saved}
              reviews={reviews}
              ratings={ratings}
              activity={activity}
              loading={loading}
              handleProfileUpdate={handleProfileUpdate}
              handlePasswordChange={handlePasswordChange}
               handleRemoveWishlist={handleRemoveWishlist}
            />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Profile;
