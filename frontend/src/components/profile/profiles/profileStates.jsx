import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  MessageSquare,
  Star,
  Reply,
} from "lucide-react";

const ProfileStats = ({ stats }) => {
  const cards = [
    {
      title: "Wishlist",
      value: stats?.wishlist || 0,
      icon: Heart,
    },
    {
      title: "Reviews",
      value: stats?.reviews || 0,
      icon: MessageSquare,
    },
    {
      title: "Ratings",
      value: stats?.ratings || 0,
      icon: Star,
    },
    {
      title: "Replies",
      value: stats?.replies || 0,
      icon: Reply,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h3 className="mt-1 text-3xl font-bold">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-full bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;