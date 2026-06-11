import { Card } from "@/components/ui/card";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
    },

    {
      title: "Destinations",
      value: stats.totalDestinations,
    },

    {
      title: "Comments",
      value: stats.totalComments,
    },

    {
      title: "Ratings",
      value: stats.totalRatings,
    },

    {
      title: "Wishlist",
      value: stats.totalWishlist,
    },

    {
      title: "Reactions",
      value: stats.totalReactions,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="p-5"
        >
          <h3 className="text-sm text-muted-foreground">
            {card.title}
          </h3>

          <p className="text-3xl font-bold">
            {card.value}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;