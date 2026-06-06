import ReviewCard from "./ReviewCard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { MessageSquareText } from "lucide-react";

const ReviewsTab = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <MessageSquareText className="mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-lg font-semibold">
            No Reviews Yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Reviews you write on destinations
            will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewsTab;