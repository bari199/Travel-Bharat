import { AnimatePresence, motion } from "framer-motion";
import OverviewTab from "../overview/OverviewTab";
import WishlistTab from "../wishlist/WishlistTab";
import ReviewsTab from "../reviews/ReviewsTab";
import RatingsTab from "../ratings/RatingTab";
import ActivityTab from "../activity/ActivityTab";
import SettingsTab from "../settings/SettingsTab";

const tabVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

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
  const renderTab = () => {
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
        return <ReviewsTab reviews={reviews} />;
      case "ratings":
        return <RatingsTab ratings={ratings} />;
      case "activity":
        return <ActivityTab activity={activity} />;
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
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {renderTab()}
      </motion.div>
    </AnimatePresence>
  );
}