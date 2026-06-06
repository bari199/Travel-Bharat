import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Heart, MessageSquare, Star, Activity, Settings } from "lucide-react";

import OverviewTab from "../overview/OverviewTab";
import WishlistTab from "../wishlist/WishlistTab";
import ReviewsTab from "../reviews/ReviewsTab";
import RatingsTab from "../ratings/RatingTab";
import ActivityTab from "../activity/ActivityTab";
import SettingsTab from "../settings/SettingsTab";

const tabs = [
  { value: "overview",  label: "Overview",  Icon: LayoutDashboard },
  { value: "wishlist",  label: "Wishlist",   Icon: Heart },
  { value: "reviews",   label: "Reviews",    Icon: MessageSquare },
  { value: "ratings",   label: "Ratings",    Icon: Star },
  { value: "activity",  label: "Activity",   Icon: Activity },
  { value: "settings",  label: "Settings",   Icon: Settings },
];

const ProfileTabs = ({ user, wishlist, reviews, ratings, activity, onProfileUpdate, onPasswordChange, loading }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      {/* Tab bar */}
      <div className="overflow-x-auto">
        <TabsList className="inline-flex h-auto w-full min-w-max gap-1 rounded-2xl border border-orange-100 bg-orange-50/60 p-1.5 sm:w-full">
          {tabs.map(({ value, label, Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="
                flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-500
                transition-all duration-200
                data-[state=active]:bg-white data-[state=active]:text-orange-500
                data-[state=active]:shadow-sm
                hover:text-orange-400
                sm:px-4 sm:text-sm
              "
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.slice(0, 4)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="overview">
          <OverviewTab user={user} reviews={reviews} ratings={ratings} wishlist={wishlist} />
        </TabsContent>

        <TabsContent value="wishlist">
          <WishlistTab wishlist={wishlist} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab reviews={reviews} />
        </TabsContent>

        <TabsContent value="ratings">
          <RatingsTab ratings={ratings} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab activity={activity} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab
            user={user}
            onProfileUpdate={onProfileUpdate}
            onPasswordChange={onPasswordChange}
            loading={loading}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
