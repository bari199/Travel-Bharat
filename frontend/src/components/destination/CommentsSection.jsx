import React, { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Trash2,
} from "lucide-react";

import api from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { getData } from "@/context/userContext";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          key={item}
          size={14}
          className={
            item <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

const CommentsSection = ({ destinationId }) => {
  const { user } = getData();

  const [reviews, setReviews] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const [replyText, setReplyText] = useState({});
  const [openReply, setOpenReply] = useState(null);

  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH COMMENTS
  |--------------------------------------------------------------------------
  */
  const fetchComments = async () => {
    try {
      const res = await api.get(
        `/comments/${destinationId}`
      );

      setReviews(res.data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH RATINGS
  |--------------------------------------------------------------------------
  */
  const fetchRatings = async () => {
    try {
      const res = await api.get(
        `/ratings/${destinationId}`
      );

      setAverageRating(
        Number(res.data.averageRating || 0)
      );

      setTotalRatings(
        res.data.totalRatings || 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT RATING
  |--------------------------------------------------------------------------
  */
  const submitRating = async (
    selectedRating
  ) => {
    try {
      const token = getToken();

      await api.post(
        "/ratings",
        {
          destinationId,
          rating: selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRatings();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ADD COMMENT
  |--------------------------------------------------------------------------
  */
  const handleAddReview = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const token = getToken();

      await api.post(
        "/ratings",
        {
          destinationId,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await api.post(
        `/comments/${destinationId}`,
        {
          message: commentText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText("");
      setRating(5);

      fetchComments();
      fetchRatings();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE COMMENT
  |--------------------------------------------------------------------------
  */
  const handleDeleteComment = async (
    commentId
  ) => {
    try {
      const token = getToken();

      await api.delete(
        `/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REPLY
  |--------------------------------------------------------------------------
  */
  const handleReply = async (
    commentId
  ) => {
    if (
      !replyText[commentId]?.trim()
    )
      return;

    try {
      const token = getToken();

      await api.post(
        `/comments/reply/${commentId}`,
        {
          message:
            replyText[commentId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyText({
        ...replyText,
        [commentId]: "",
      });

      setOpenReply(null);

      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchComments();
      fetchRatings();
    }
  }, [destinationId]);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-5xl mx-auto px-5">

        {/* HEADER */}
        <div className="mb-8">
          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
            Reviews
          </span>

          <h2 className="text-3xl font-bold mt-4">
            Comments & Reviews
          </h2>

          <p className="text-gray-500 mt-2">
            Share your experience and
            read traveler feedback.
          </p>
        </div>

        {/* OVERALL RATING */}
        <Card className="mb-6 border-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Overall Rating
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-4xl font-bold text-orange-500">
                    {averageRating}
                  </span>

                  <StarRating
                    rating={Math.round(
                      averageRating
                    )}
                  />
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold">
                  {totalRatings}
                </p>

                <p className="text-gray-500 text-sm">
                  Total Ratings
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* COMMENT FORM */}
        <Card className="rounded-3xl mb-8">
          <CardContent className="p-6 space-y-5">

            <div>
              <h3 className="font-semibold text-xl">
                Leave a Review
              </h3>
            </div>

            <div>
              <p className="text-sm mb-3">
                Rate this destination
              </p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={28}
                      onClick={() =>
                        setRating(star)
                      }
                      className={`cursor-pointer transition ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            <Textarea
              value={commentText}
              onChange={(e) =>
                setCommentText(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              className="min-h-[130px]"
            />

            <Button
              disabled={loading}
              onClick={
                handleAddReview
              }
            >
              {loading
                ? "Posting..."
                : "Post Review"}
            </Button>

          </CardContent>
        </Card>

        {/* COMMENTS */}
        <div className="max-h-[700px] overflow-y-auto pr-2 space-y-8">

          {reviews.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No comments yet.
            </div>
          )}

          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b pb-8"
            >
              <div className="flex justify-between">

                <div className="flex gap-4">

                  <Avatar>
                    <AvatarFallback>
                      {review.username
                        ?.split(" ")
                        .map(
                          (w) => w[0]
                        )
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">
                      {
                        review.username
                      }
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <StarRating
                        rating={
                          review.rating ||
                          5
                        }
                      />

                      <span className="text-sm text-gray-500">
                        Traveler
                      </span>
                    </div>
                  </div>

                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-400">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>

                  {user &&
                    review.user?._id ===
                      user?._id && (
                      <button
                        onClick={() =>
                          handleDeleteComment(
                            review._id
                          )
                        }
                        className="flex items-center gap-1 text-red-500 text-sm mt-2"
                      >
                        <Trash2
                          size={14}
                        />
                        Delete
                      </button>
                    )}
                </div>

              </div>

              <p className="mt-4 text-gray-600 leading-7">
                {review.message}
              </p>

              <div className="flex gap-6 mt-5">

                <button className="flex items-center gap-2 text-sm">
                  <ThumbsUp
                    size={15}
                  />
                  Helpful
                </button>

                <button className="flex items-center gap-2 text-sm">
                  <ThumbsDown
                    size={15}
                  />
                  Not Helpful
                </button>

                <button
                  onClick={() =>
                    setOpenReply(
                      openReply ===
                        review._id
                        ? null
                        : review._id
                    )
                  }
                  className="flex items-center gap-2 text-sm text-orange-500"
                >
                  <Send size={14} />
                  Reply
                </button>

              </div>

              {openReply ===
                review._id && (
                <div className="mt-4 flex gap-3">
                  <Input
                    placeholder="Write reply..."
                    value={
                      replyText[
                        review._id
                      ] || ""
                    }
                    onChange={(e) =>
                      setReplyText({
                        ...replyText,
                        [review._id]:
                          e.target
                            .value,
                      })
                    }
                  />

                  <Button
                    onClick={() =>
                      handleReply(
                        review._id
                      )
                    }
                  >
                    Send
                  </Button>
                </div>
              )}

              {review.replies
                ?.length > 0 && (
                <div className="ml-6 mt-5 border-l pl-5 space-y-3">

                  {review.replies.map(
                    (
                      reply,
                      index
                    ) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-xl"
                      >
                        <h5 className="font-medium text-sm">
                          {
                            reply.username
                          }
                        </h5>

                        <p className="text-sm text-gray-600 mt-2">
                          {
                            reply.message
                          }
                        </p>
                      </div>
                    )
                  )}

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