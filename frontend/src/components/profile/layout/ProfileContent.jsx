import OverviewTab from "../overview/OverviewTab";
import WishlistTab from "../wishlist/WishlistTab";
import ReviewsTab from "../reviews/ReviewsTab";
import RatingsTab from "../ratings/RatingTab";
import ActivityTab from "../activity/ActivityTab";
import SettingsTab from "../settings/SettingsTab";


export default function ProfileContent({
  activeTab,
  user,
  wishlist,
  reviews,
  ratings,
  activity,
  loading,
  handleProfileUpdate,
  handlePasswordChange,
  handleRemoveWishlist,
}) {
  switch (activeTab) {
    case "overview":
      return (
        <OverviewTab
          user={user}
          wishlist={wishlist}
          reviews={reviews}
          ratings={ratings}
        />
      );

    case "wishlist":
      return (
        <WishlistTab
          wishlist={wishlist}
          onRemoveWishlist={handleRemoveWishlist}
        />
      );

    case "reviews":
      return (
        <ReviewsTab
          reviews={reviews}
        />
      );

    case "ratings":
      return (
        <RatingsTab
          ratings={ratings}
        />
      );

    case "activity":
      return (
        <ActivityTab
          activity={activity}
        />
      );

    case "settings":
      return (
        <SettingsTab
          user={user}
          loading={loading}
          onProfileUpdate={handleProfileUpdate}
          onPasswordChange={handlePasswordChange}
        />
      );

    default:
      return null;
  }
}