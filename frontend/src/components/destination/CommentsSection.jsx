import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Trash2,
  Pencil,
  Bold,
  Italic,
  Underline,
  MessageSquare,
  BarChart3,
  Award,
  CornerDownRight,
  X,
} from "lucide-react";

import api from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { getData } from "@/context/userContext";

/*
|--------------------------------------------------------------------------
| Star Rating — Display Only
|--------------------------------------------------------------------------
*/
const StarRating = ({ rating = 0 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={13}
        className={
          star <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-200 fill-gray-200"
        }
      />
    ))}
    <span className="ml-1 text-xs text-gray-400 dark:text-slate-500 font-medium">{rating}/5</span>
  </div>
);

/*
|--------------------------------------------------------------------------
| Interactive Star Picker
|--------------------------------------------------------------------------
*/
const StarPicker = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={26}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`cursor-pointer transition-all duration-150 ${
            star <= (hovered || rating)
              ? "fill-yellow-400 text-yellow-400 scale-110"
              : "text-gray-300 dark:text-slate-600 fill-gray-100"
          }`}
        />
      ))}
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Rich Text Toolbar
| Wraps selected text with markdown-like markers for bold/italic/underline.
| We render the final text as plain — this is a simple visual aid only.
| Swap for a proper rich-text editor (TipTap, etc.) if you need HTML output.
|--------------------------------------------------------------------------
*/
const RichToolbar = ({ textareaRef, value, onChange }) => {
  const wrap = (before, after) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const selected = value.slice(start, end);

    const newText =
      value.slice(0, start) + before + selected + after + value.slice(end);

    onChange(newText);

    // Restore cursor after state update
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(
        start + before.length,
        end + before.length
      );
    });
  };

  const tools = [
    { icon: Bold,      label: "Bold",      action: () => wrap("**", "**") },
    { icon: Italic,    label: "Italic",    action: () => wrap("_", "_")   },
    { icon: Underline, label: "Underline", action: () => wrap("<u>", "</u>") },
  ];

  return (
    <div className="flex items-center gap-1 mb-2 p-1.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-lg w-fit">
      {tools.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          type="button"
          title={label}
          onMouseDown={(e) => {
            e.preventDefault(); // keep textarea focus
            action();
          }}
          className="p-1.5 rounded-md text-gray-500 dark:text-slate-400 hover:text-gray-800 hover:bg-white hover:shadow-sm transition-all"
        >
          <Icon size={14} strokeWidth={2.5} />
        </button>
      ))}
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Stat Pill
|--------------------------------------------------------------------------
*/
const StatPill = ({ icon: Icon, label, value, color = "gray" }) => {
  const colors = {
    orange: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 border-orange-100 dark:border-orange-500/20",
    blue:   "bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-100",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${colors[color]}`}>
      <Icon size={14} />
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| CommentsSection — Main Component
|--------------------------------------------------------------------------
*/
const CommentsSection = ({ destinationId }) => {
  const { user } = getData();

  const [reviews, setReviews]         = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating]           = useState(5);
  const [loading, setLoading]         = useState(false);
  const [replyText, setReplyText]     = useState({});
  const [openReply, setOpenReply]     = useState(null);
  const [reactionStats, setReactionStats] = useState({});
  const [destStats, setDestStats]     = useState({ averageRating: 0, totalRatings: 0 });

  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, commentId: null });

  // Edit dialog
  const [editDialog, setEditDialog] = useState({ open: false, commentId: null, text: "" });
  const [editLoading, setEditLoading] = useState(false);

  const textareaRef = useRef(null);
  const editTextareaRef = useRef(null);

  const getToken = () => localStorage.getItem("accessToken");

  /*
  |--------------------------------------------------------------------------
  | FETCH COMMENTS
  |--------------------------------------------------------------------------
  */
  const fetchComments = useCallback(async () => {
    try {
      const res = await api.get(`/comments/${destinationId}`);
      const comments = res.data?.comments || [];
      setReviews(comments);
      return comments;
    } catch (error) {
      console.error("fetchComments error:", error);
      return [];
    }
  }, [destinationId]);

  /*
  |--------------------------------------------------------------------------
  | FETCH BATCH REACTION STATS
  |--------------------------------------------------------------------------
  */
  const fetchReactionStats = useCallback(async (comments) => {
    if (!comments || comments.length === 0) return;
    try {
      const token = getToken();
      const res = await api.post(
        "/reactions/stats/batch",
        { commentIds: comments.map((c) => c._id) },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setReactionStats(res.data?.stats || {});
    } catch (error) {
      console.error("fetchReactionStats error:", error);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH DESTINATION STATS
  |--------------------------------------------------------------------------
  */
  const fetchDestStats = useCallback(async () => {
    try {
      const res = await api.get(`/destinations/${destinationId}`);
      const s = res.data?.stats || {};
      setDestStats({
        averageRating: s.averageRating || 0,
        totalRatings:  s.totalRatings  || 0,
      });
    } catch (error) {
      console.error("fetchDestStats error:", error);
    }
  }, [destinationId]);

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!destinationId) return;
    const init = async () => {
      const comments = await fetchComments();
      await Promise.all([fetchReactionStats(comments), fetchDestStats()]);
    };
    init();
  }, [destinationId, user, fetchComments, fetchReactionStats, fetchDestStats]);

  /*
  |--------------------------------------------------------------------------
  | ADD REVIEW
  |--------------------------------------------------------------------------
  */
  const handleAddReview = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      const token = getToken();

      await api.post(
        "/ratings",
        { destinationId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await api.post(
        `/comments/${destinationId}`,
        { message: commentText, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentText("");
      setRating(5);
      const comments = await fetchComments();
      await Promise.all([fetchReactionStats(comments), fetchDestStats()]);
    } catch (error) {
      console.error("handleAddReview error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE COMMENT — triggered after confirmation dialog
  |--------------------------------------------------------------------------
  */
  const confirmDelete = async () => {
    const commentId = deleteDialog.commentId;
    if (!commentId) return;

    try {
      const token = getToken();
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews((prev) => prev.filter((r) => r._id !== commentId));
      setReactionStats((prev) => {
        const copy = { ...prev };
        delete copy[commentId];
        return copy;
      });
    } catch (error) {
      console.error("confirmDelete error:", error);
    } finally {
      setDeleteDialog({ open: false, commentId: null });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | EDIT COMMENT — save from dialog
  |--------------------------------------------------------------------------
  */
  const handleEditSave = async () => {
    const { commentId, text } = editDialog;
    if (!text.trim()) return;

    try {
      setEditLoading(true);
      const token = getToken();

      await api.put(
        `/comments/${commentId}`,
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state instantly
      setReviews((prev) =>
        prev.map((r) =>
          r._id === commentId ? { ...r, message: text } : r
        )
      );
    } catch (error) {
      console.error("handleEditSave error:", error);
    } finally {
      setEditLoading(false);
      setEditDialog({ open: false, commentId: null, text: "" });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REPLY
  |--------------------------------------------------------------------------
  */
  const handleReply = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;
    try {
      const token = getToken();
      await api.post(
        `/comments/reply/${commentId}`,
        { message: replyText[commentId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setOpenReply(null);
      const comments = await fetchComments();
      fetchReactionStats(comments);
    } catch (error) {
      console.error("handleReply error:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE LIKE (optimistic)
  |--------------------------------------------------------------------------
  */
  const handleLike = async (commentId) => {
    if (!user) return;
    const prev = reactionStats[commentId] || { likes: 0, dislikes: 0, userReaction: null };
    const wasLiked    = prev.userReaction === "like";
    const wasDisliked = prev.userReaction === "dislike";

    setReactionStats((s) => ({
      ...s,
      [commentId]: {
        likes:        wasLiked ? prev.likes - 1 : prev.likes + 1,
        dislikes:     wasDisliked ? prev.dislikes - 1 : prev.dislikes,
        userReaction: wasLiked ? null : "like",
      },
    }));

    try {
      const token = getToken();
      const res = await api.post(
        `/reactions/like/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReactionStats((s) => ({
        ...s,
        [commentId]: {
          likes:        res.data.likes,
          dislikes:     res.data.dislikes,
          userReaction: res.data.userReaction,
        },
      }));
    } catch (error) {
      setReactionStats((s) => ({ ...s, [commentId]: prev }));
      console.error("handleLike error:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE DISLIKE (optimistic)
  |--------------------------------------------------------------------------
  */
  const handleDislike = async (commentId) => {
    if (!user) return;
    const prev = reactionStats[commentId] || { likes: 0, dislikes: 0, userReaction: null };
    const wasDisliked = prev.userReaction === "dislike";
    const wasLiked    = prev.userReaction === "like";

    setReactionStats((s) => ({
      ...s,
      [commentId]: {
        likes:        wasLiked ? prev.likes - 1 : prev.likes,
        dislikes:     wasDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
        userReaction: wasDisliked ? null : "dislike",
      },
    }));

    try {
      const token = getToken();
      const res = await api.post(
        `/reactions/dislike/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReactionStats((s) => ({
        ...s,
        [commentId]: {
          likes:        res.data.likes,
          dislikes:     res.data.dislikes,
          userReaction: res.data.userReaction,
        },
      }));
    } catch (error) {
      setReactionStats((s) => ({ ...s, [commentId]: prev }));
      console.error("handleDislike error:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */
  return (
    <section className="w-full py-14 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-5">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <Badge
            variant="outline"
            className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-500/20 px-3 py-1 text-xs font-semibold tracking-wide uppercase"
          >
            Traveler Reviews
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight mt-3 text-gray-900 dark:text-slate-100">
            Comments &amp;{" "}
            <span className="underline decoration-orange-400 decoration-2 underline-offset-4">
              Reviews
            </span>
          </h2>

          <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            <em>Share your experience</em> and help other travelers make better
            decisions.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 mt-5">
            <StatPill
              icon={Star}
              label="Avg Rating"
              value={destStats.averageRating}
              color="yellow"
            />
            <StatPill
              icon={BarChart3}
              label="Total Ratings"
              value={destStats.totalRatings}
              color="blue"
            />
            <StatPill
              icon={MessageSquare}
              label="Reviews"
              value={reviews.length}
              color="orange"
            />
          </div>
        </div>

        {/* ── COMMENT FORM ── */}
        <Card className="rounded-2xl border border-gray-200 dark:bg-slate-900 dark:border-slate-700 shadow-sm mb-10">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-orange-500" />
              <h3 className="font-bold text-lg text-gray-800 dark:text-slate-200">Leave a Review</h3>
            </div>

            {/* Star picker */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Your Rating
              </p>
              <StarPicker rating={rating} setRating={setRating} />
              <p className="text-xs text-orange-500 mt-1.5 font-medium">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]} · {rating}/5
              </p>
            </div>

            {/* Rich text toolbar + Textarea */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Your Review
              </p>
              <RichToolbar
                textareaRef={textareaRef}
                value={commentText}
                onChange={setCommentText}
              />
              <Textarea
                ref={textareaRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your honest review… (select text and use toolbar for Bold, Italic, Underline)"
                className="min-h-[130px] resize-none text-sm leading-relaxed border-gray-200 dark:border-slate-700 focus:ring-orange-300"
              />
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 text-right">
                {commentText.length} characters
              </p>
            </div>

            <Button
              disabled={loading || !commentText.trim()}
              onClick={handleAddReview}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              {loading ? "Posting…" : "Post Review"}
            </Button>
          </CardContent>
        </Card>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* ── COMMENTS LIST ── */}
        <div
          className="space-y-0 overflow-y-auto pr-1"
          style={{
            maxHeight: "780px",
            scrollbarWidth: "thin",
            scrollbarColor: "#fed7aa #f5f5f5",
          }}
        >
          {reviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare size={40} className="text-gray-200 mb-3" />
              <p className="font-semibold text-gray-400 dark:text-slate-500">No reviews yet</p>
              <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
                Be the first to share your experience!
              </p>
            </div>
          )}

          {reviews.map((review, idx) => {
            const rxn = reactionStats[review._id] || {
              likes: 0,
              dislikes: 0,
              userReaction: null,
            };
            const isOwner = user && review.user?._id === user?._id;

            return (
              <div
                key={review._id}
                className={`py-7 ${idx !== reviews.length - 1 ? "border-b border-gray-100 dark:border-slate-800" : ""}`}
              >
                {/* ── Comment header ── */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3 items-start">
                    <Avatar className="h-10 w-10 ring-2 ring-orange-100">
                      <AvatarFallback className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 font-bold text-sm">
                        {review.username
                          ?.split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 dark:text-slate-200 text-sm">
                          {review.username}
                        </h4>
                        {isOwner && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 text-orange-500 border-orange-200 dark:border-orange-500/20"
                          >
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Date + owner actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {isOwner && (
                      <div className="flex items-center gap-1">
                        {/* Edit button */}
                        <button
                          onClick={() =>
                            setEditDialog({
                              open: true,
                              commentId: review._id,
                              text: review.message,
                            })
                          }
                          className="p-1.5 rounded-md text-gray-400 dark:text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all"
                          title="Edit comment"
                        >
                          <Pencil size={13} />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() =>
                            setDeleteDialog({ open: true, commentId: review._id })
                          }
                          className="p-1.5 rounded-md text-gray-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete comment"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Comment body ── */}
                <p className="mt-3 text-gray-600 dark:text-slate-300 text-sm leading-relaxed pl-[52px]">
                  {review.message}
                </p>

                {/* ── Actions: Like / Dislike / Reply ── */}
                <div className="flex items-center gap-2 mt-4 pl-[52px]">
                  <button
                    onClick={() => handleLike(review._id)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                      rxn.userReaction === "like"
                        ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-500/20"
                        : "text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                  >
                    <ThumbsUp
                      size={13}
                      className={rxn.userReaction === "like" ? "fill-orange-500" : ""}
                    />
                    Helpful
                    {rxn.likes > 0 && (
                      <span className="font-bold">{rxn.likes}</span>
                    )}
                  </button>

                  <button
                    onClick={() => handleDislike(review._id)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                      rxn.userReaction === "dislike"
                        ? "bg-red-50 dark:bg-red-500/10 text-red-500 border-red-200 dark:border-red-500/30"
                        : "text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-red-200 hover:text-red-400 hover:bg-red-50"
                    }`}
                  >
                    <ThumbsDown
                      size={13}
                      className={rxn.userReaction === "dislike" ? "fill-red-500" : ""}
                    />
                    Not Helpful
                    {rxn.dislikes > 0 && (
                      <span className="font-bold">{rxn.dislikes}</span>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setOpenReply(openReply === review._id ? null : review._id)
                    }
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 transition-all font-medium"
                  >
                    <CornerDownRight size={13} />
                    Reply
                    {review.replies?.length > 0 && (
                      <span className="font-bold">{review.replies.length}</span>
                    )}
                  </button>
                </div>

                {/* ── Reply input ── */}
                {openReply === review._id && (
                  <div className="mt-4 pl-[52px] flex gap-2">
                    <Input
                      placeholder="Write a reply…"
                      value={replyText[review._id] || ""}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [review._id]: e.target.value,
                        }))
                      }
                      className="text-sm border-gray-200 dark:border-slate-700 focus:ring-orange-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey)
                          handleReply(review._id);
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleReply(review._id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white shrink-0"
                    >
                      <Send size={13} className="mr-1" />
                      Send
                    </Button>
                    <button
                      onClick={() => setOpenReply(null)}
                      className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* ── Replies list — scrollable ── */}
                {review.replies?.length > 0 && (
                  <div className="pl-[52px] mt-4">
                    <div
                      className="border-l-2 border-orange-100 dark:border-orange-500/20 pl-4 space-y-3 overflow-y-auto"
                      style={{
                        maxHeight: "260px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#fed7aa transparent",
                      }}
                    >
                      {review.replies.map((reply, index) => (
                        <div
                          key={index}
                          className="flex gap-3 items-start bg-gray-50 dark:bg-slate-950 rounded-xl p-3"
                        >
                          <Avatar className="h-7 w-7 shrink-0">
                            <AvatarFallback className="bg-orange-100 dark:bg-orange-500/15 text-orange-600 text-xs font-bold">
                              {reply.username
                                ?.split(" ")
                                .map((w) => w[0])
                                .join("")
                                .toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                              {reply.username || "User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {reply.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════
          DELETE CONFIRMATION DIALOG
      ══════════════════════════════════════ */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((prev) => ({ ...prev, open }))
        }
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-gray-800 dark:text-slate-200">
              <Trash2 size={18} className="text-red-500" />
              Delete Comment
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-slate-400 text-sm">
              Are you sure you want to delete this comment? This action{" "}
              <strong>cannot be undone</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ══════════════════════════════════════
          EDIT COMMENT DIALOG
      ══════════════════════════════════════ */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) =>
          setEditDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-slate-200">
              <Pencil size={16} className="text-orange-500" />
              Edit Your Review
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <RichToolbar
              textareaRef={editTextareaRef}
              value={editDialog.text}
              onChange={(val) =>
                setEditDialog((prev) => ({ ...prev, text: val }))
              }
            />
            <Textarea
              ref={editTextareaRef}
              value={editDialog.text}
              onChange={(e) =>
                setEditDialog((prev) => ({ ...prev, text: e.target.value }))
              }
              className="min-h-[140px] resize-none text-sm leading-relaxed border-gray-200 dark:border-slate-700 focus:ring-blue-200"
              placeholder="Edit your review…"
            />
            <p className="text-xs text-gray-400 dark:text-slate-500 text-right">
              {editDialog.text.length} characters
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() =>
                setEditDialog({ open: false, commentId: null, text: "" })
              }
            >
              Cancel
            </Button>
            <Button
              disabled={editLoading || !editDialog.text.trim()}
              onClick={handleEditSave}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              {editLoading ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CommentsSection;