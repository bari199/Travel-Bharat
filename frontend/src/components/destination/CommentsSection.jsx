import React, { useState } from "react";

import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

const initialReviews = [
  {
    id: 1,
    name: "Ali Tufan",
    date: "April 2023",
    rating: 5,
    title: "Take this tour! Its fantastic!",
    text: "Great for 4-5 hours to explore. Really a lot to see and tons of photo spots. Even have a passport for you to collect all the stamps as a souvenir. Must see for a Harry Potter fan.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=500",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=500",
    ],
    replies: [
      {
        id: 11,
        name: "TravelBharat",
        text: "Thank you for sharing your amazing experience with us ❤️",
      },
    ],
  },
  {
    id: 2,
    name: "Ali Tufan",
    date: "April 2023",
    rating: 5,
    title: "Beautiful journey and amazing views!",
    text: "Loved the complete Darjeeling trip. Tea gardens, toy train and sunrise point were unforgettable.",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=500",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=500",
    ],
    replies: [],
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          key={item}
          size={14}
          className={`${
            item <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const CommentsSection = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const [commentText, setCommentText] = useState("");

  const [rating, setRating] = useState(5);

  const [replyText, setReplyText] = useState({});

  const [openReply, setOpenReply] = useState(null);

  // ADD REVIEW
  const handleAddReview = () => {
    if (!commentText.trim()) return;

    const newReview = {
      id: Date.now(),
      name: "Guest User",
      date: "Now",
      rating,
      title: "Wonderful Experience!",
      text: commentText,
      images: [],
      replies: [],
    };

    setReviews([newReview, ...reviews]);

    setCommentText("");
    setRating(5);
  };

  // ADD REPLY
  const handleReply = (reviewId) => {
    if (!replyText[reviewId]) return;

    const updated = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [
            ...review.replies,
            {
              id: Date.now(),
              name: "TravelBharat",
              text: replyText[reviewId],
            },
          ],
        };
      }

      return review;
    });

    setReviews(updated);

    setReplyText({
      ...replyText,
      [reviewId]: "",
    });

    setOpenReply(null);
  };

  return (
    <section className="w-full py-12 bg-white">

      <div className="max-w-5xl mx-auto px-5">

        {/* HEADING */}
        <div className="mb-10">

          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
            Reviews
          </span>

          <h2 className="text-[32px] font-bold text-slate-900 mt-4">
            Comments & Reviews
          </h2>

          <p className="text-gray-500 mt-3 text-sm leading-7 max-w-2xl">
            Read traveler experiences, reviews, feedback, and replies
            shared by visitors who explored this destination.
          </p>

        </div>

        {/* REVIEW FORM */}
        <Card className="border border-gray-200 rounded-3xl shadow-sm mb-10">

          <CardContent className="p-6 space-y-5">

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Leave a Review
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Share your experience about this trip.
              </p>
            </div>

            {/* STAR SELECT */}
            <div className="flex items-center gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}

            </div>

            {/* TEXTAREA */}
            <Textarea
              placeholder="Write your review..."
              className="min-h-[130px] rounded-2xl border-gray-200 focus-visible:ring-0"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            {/* BUTTON */}
            <Button
              onClick={handleAddReview}
              className="rounded-2xl h-11 px-6"
            >
              Post Review
            </Button>

          </CardContent>

        </Card>

        {/* REVIEWS */}
        <div className="space-y-10">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-10"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">

                  {/* AVATAR */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-slate-900 text-white">
                      {review.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* USER INFO */}
                  <div>

                    <h4 className="font-semibold text-slate-900">
                      {review.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />

                      <span className="text-sm font-medium text-slate-700">
                        {review.title}
                      </span>
                    </div>

                  </div>

                </div>

                {/* DATE */}
                <p className="text-sm text-gray-400">
                  {review.date}
                </p>

              </div>

              {/* REVIEW TEXT */}
              <p className="text-gray-600 text-[15px] leading-8 mt-5 max-w-4xl">
                {review.text}
              </p>

              {/* IMAGES */}
              {review.images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">

                  {review.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="review"
                      className="w-[120px] h-[90px] object-cover rounded-2xl"
                    />
                  ))}

                </div>
              )}

              {/* ACTIONS */}
              <div className="flex items-center gap-6 mt-6">

                <button className="flex items-center gap-2 text-sm text-slate-700 hover:text-black transition">
                  <ThumbsUp size={15} />
                  Helpful
                </button>

                <button className="flex items-center gap-2 text-sm text-slate-700 hover:text-black transition">
                  <ThumbsDown size={15} />
                  Not helpful
                </button>

                <button
                  onClick={() =>
                    setOpenReply(
                      openReply === review.id
                        ? null
                        : review.id
                    )
                  }
                  className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition"
                >
                  <Send size={14} />
                  Reply
                </button>

              </div>

              {/* REPLY BOX */}
              {openReply === review.id && (
                <div className="mt-5 flex gap-3">

                  <Input
                    placeholder="Write your reply..."
                    className="rounded-2xl h-11"
                    value={replyText[review.id] || ""}
                    onChange={(e) =>
                      setReplyText({
                        ...replyText,
                        [review.id]: e.target.value,
                      })
                    }
                  />

                  <Button
                    onClick={() => handleReply(review.id)}
                    className="rounded-2xl h-11 px-5"
                  >
                    Send
                  </Button>

                </div>
              )}

              {/* REPLIES */}
              {review.replies.length > 0 && (
                <div className="mt-6 ml-6 border-l border-gray-200 pl-6 space-y-4">

                  {review.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-50 rounded-2xl p-4"
                    >

                      <h5 className="font-semibold text-sm text-slate-900">
                        {reply.name}
                      </h5>

                      <p className="text-sm text-gray-600 leading-7 mt-2">
                        {reply.text}
                      </p>

                    </div>
                  ))}

                </div>
              )}

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default CommentsSection;