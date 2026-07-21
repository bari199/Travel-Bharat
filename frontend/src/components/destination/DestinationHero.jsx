import React, { useEffect, useState, useCallback } from "react";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  ImageOff,
  CheckCircle2,
  BadgePercent,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import api from "@/lib/api";

/*
|--------------------------------------------------------------------------
| Skeleton — shown while ratings / wishlist status load
|--------------------------------------------------------------------------
*/
const HeroSkeleton = () => (
  <section className="w-full bg-white dark:bg-slate-900 py-8">
    <div className="max-w-5xl mx-auto px-5 lg:px-2 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-10 rounded" />
        <Skeleton className="h-4 w-3 rounded" />
        <Skeleton className="h-4 w-10 rounded" />
        <Skeleton className="h-4 w-3 rounded" />
        <Skeleton className="h-4 w-28 rounded" />
      </div>

      {/* Tags */}
      <div className="flex gap-3">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-36 rounded-full" />
      </div>

      {/* Title block */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-5 w-36 rounded" />
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </div>

      {/* Gallery skeleton */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Skeleton className="lg:w-[57%] h-[280px] md:h-[450px] rounded-[24px]" />
        <div className="lg:w-[43%] h-[280px] md:h-[450px] grid grid-cols-2 grid-rows-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-full rounded-[20px]" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/*
|--------------------------------------------------------------------------
| Star Row — display only
|--------------------------------------------------------------------------
*/
const StarRow = ({ rating, size = 14 }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={
          star <= Math.round(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

/*
|--------------------------------------------------------------------------
| Gallery Image Tile
|--------------------------------------------------------------------------
*/
const GalleryTile = ({ src, alt, onClick, className, children }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className={`relative overflow-hidden cursor-pointer ${className}`}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
    {children}
  </motion.div>
);

/*
|--------------------------------------------------------------------------
| DestinationHero
|--------------------------------------------------------------------------
*/
const DestinationHero = ({ destination, setOpenLogin }) => {
  const images = destination?.images || [];

  const [pageReady, setPageReady]         = useState(false);
  const [open, setOpen]                   = useState(false);
  const [currentImage, setCurrentImage]   = useState(0);
  const [isWishlisted, setIsWishlisted]   = useState(false);
  const [wishlistId, setWishlistId]       = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings]   = useState(0);
  const [copied, setCopied]               = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Lightbox navigation
  |--------------------------------------------------------------------------
  */
  const handleOpen = (index) => {
    if (!images.length) return;
    setCurrentImage(index);
    setOpen(true);
  };

  const nextSlide = useCallback(() => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft")  prevSlide();
      if (e.key === "Escape")     setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, nextSlide, prevSlide]);

  /*
  |--------------------------------------------------------------------------
  | Share — copies URL to clipboard
  |--------------------------------------------------------------------------
  */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent fail — browser may block on http */
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Wishlist status fetch
  |--------------------------------------------------------------------------
  */
  const fetchWishlistStatus = useCallback(async () => {
    try {
      const res      = await api.get("/wishlist");
      const wishlist = res?.data?.wishlist || [];
      const existing = wishlist.find(
        (item) =>
          item?.destination?._id === destination?._id ||
          item?.destination === destination?._id
      );

      if (existing) {
        setIsWishlisted(true);
        setWishlistId(existing._id);
      } else {
        setIsWishlisted(false);
        setWishlistId(null);
      }
    } catch {
      setIsWishlisted(false);
      setWishlistId(null);
    }
  }, [destination?._id]);

  /*
  |--------------------------------------------------------------------------
  | Ratings fetch
  |--------------------------------------------------------------------------
  */
 const fetchRatings = useCallback(async () => {
  try {
    const res = await api.get(`/ratings/${destination._id}`);

    console.log("Ratings API:", res.data);

    setAverageRating(Number(res.data.averageRating) || 0);
    setTotalRatings(Number(res.data.totalRatings) || 0);
  } catch (error) {
    console.log(error);
  }
}, [destination?._id]);

  /*
  |--------------------------------------------------------------------------
  | Initial data load
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!destination?._id) return;

    const token = localStorage.getItem("accessToken");

    const boot = async () => {
      await Promise.all([
        fetchRatings(),
        token ? fetchWishlistStatus() : Promise.resolve(),
      ]);
      setPageReady(true);
    };

    boot();
  }, [destination?._id, fetchRatings, fetchWishlistStatus]);

  /*
  |--------------------------------------------------------------------------
  | Wishlist toggle
  |--------------------------------------------------------------------------
  */
  const handleWishlist = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setOpenLogin(true);
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await api.delete(`/wishlist/${wishlistId}`);
        setIsWishlisted(false);
        setWishlistId(null);
      } else {
        const res = await api.post("/wishlist", {
          destinationId: destination._id,
        });
        setIsWishlisted(true);
        setWishlistId(res.data.wishlist._id);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Show skeleton until data is ready
  |--------------------------------------------------------------------------
  */
  if (!pageReady) return <HeroSkeleton />;

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */
  return (
    <section className="w-full bg-white dark:bg-slate-900 py-8">
      <div className="max-w-5xl mx-auto px-5 lg:px-2">

        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 mb-5 flex-wrap"
          aria-label="Breadcrumb"
        >
          {["Home", "Tours", destination?.state, destination?.city].map(
            (crumb, i, arr) => (
              <React.Fragment key={i}>
                <span
                  className={
                    i === arr.length - 1
                      ? "text-gray-700 dark:text-slate-300 font-semibold"
                      : "hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer transition"
                  }
                >
                  {crumb}
                </span>
                {i < arr.length - 1 && (
                  <ChevronRight size={12} className="text-gray-300 dark:text-slate-600" />
                )}
              </React.Fragment>
            )
          )}
        </nav>

        {/* ── Badge tags ── */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Badge className="bg-orange-100 dark:bg-orange-500/15 text-orange-600 hover:bg-orange-100 border-0 text-xs font-semibold px-3 py-1 rounded-full gap-1">
            <BadgePercent size={11} />
            Best Seller
          </Badge>
          <Badge
            variant="outline"
            className="text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 text-xs font-medium px-3 py-1 rounded-full gap-1"
          >
            <CheckCircle2 size={11} className="text-green-500" />
            Free Cancellation
          </Badge>
        </div>

        {/* ── Title row ── */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 mb-7">
          <div className="max-w-2xl">
            <h1 className="text-2xl lg:text-[1.85rem] font-extrabold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {destination?.title}
            </h1>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-slate-400">
              {/* Stars */}
              <div className="flex items-center gap-1.5">
                <StarRow rating={averageRating} />
                <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">
                  {averageRating > 0 ? averageRating.toFixed(1) : "—"}
                </span>
                <span className="text-gray-400 dark:text-slate-500 text-xs">
                  ({totalRatings} {totalRatings === 1 ? "review" : "reviews"})
                </span>
              </div>

              {/* Divider */}
              <span className="hidden sm:block w-px h-4 bg-gray-200" />

              {/* Location */}
              <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400 text-xs">
                <MapPin size={13} className="text-orange-400 shrink-0" />
                <span>{destination?.location}</span>
              </div>

              {/* Divider */}
              <span className="hidden sm:block w-px h-4 bg-gray-200" />

              {/* Visitors */}
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                <Users size={13} className="text-blue-400 shrink-0" />
                <span>
                  <strong className="text-gray-800 dark:text-slate-200">
                    {destination?.totalVisitors || "30K+"}
                  </strong>{" "}
                  visitors
                </span>
              </div>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Share */}
            <button
              onClick={handleShare}
              title="Copy link"
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 px-3 py-2 rounded-full border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={15} className="text-green-500" />
                  <span className="text-green-600 text-xs font-medium">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Share2 size={15} />
                  <span className="text-xs font-medium">Share</span>
                </>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-full border transition-all ${
                isWishlisted
                  ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500"
                  : "border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-400"
              }`}
            >
              <Heart
                size={15}
                className={`transition-all duration-300 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-xs font-medium">
                {wishlistLoading ? "…" : isWishlisted ? "Saved" : "Wishlist"}
              </span>
            </button>
          </div>
        </div>

        {/* ── Gallery ── */}
        {images.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Primary large image */}
            <GalleryTile
              src={images[0]?.url || "https://placehold.co/600x400"}
              alt={destination?.name || "Destination"}
              onClick={() => handleOpen(0)}
              className="lg:w-[57%] h-[280px] md:h-[450px] rounded-[22px]"
            />

            {/* Thumbnail grid */}
            <div className="lg:w-[43%] h-[280px] md:h-[450px] grid grid-cols-2 grid-rows-2 gap-3">
              {images.slice(1, 5).map((img, index) => (
                <GalleryTile
                  key={index}
                  src={img?.url || "https://placehold.co/150x100"}
                  alt={`${destination?.name} photo ${index + 2}`}
                  onClick={() => handleOpen(index + 1)}
                  className="rounded-[18px]"
                >
                  {/* "See all" overlay on last tile */}
                  {index === 3 && images.length > 5 && (
                    <div
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-[18px] gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(0);
                      }}
                    >
                      <span className="text-white font-bold text-lg">
                        +{images.length - 5}
                      </span>
                      <span className="text-white/80 text-xs font-medium">
                        See all photos
                      </span>
                    </div>
                  )}
                </GalleryTile>
              ))}
            </div>
          </div>
        ) : (
          /* No images fallback */
          <div className="w-full h-[350px] rounded-3xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-slate-500">
            <ImageOff size={40} strokeWidth={1.5} />
            <p className="text-sm font-medium">No images available</p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          LIGHTBOX MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {open && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium select-none">
              {currentImage + 1} / {images.length}
            </div>

            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              src={images[currentImage]?.url || "https://placehold.co/600x400"}
              alt={`${destination?.name} — photo ${currentImage + 1}`}
              className="max-w-[88vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
            >
              <ChevronRight size={40} />
            </button>

            {/* Dot indicators */}
            {images.length <= 12 && (
              <div className="absolute bottom-6 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentImage
                        ? "w-5 h-1.5 bg-white dark:bg-slate-900"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DestinationHero;