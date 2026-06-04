import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import api from "@/lib/api";

const DestinationHero = ({ destination, setOpenLogin }) => {
  const images = destination.images || [];

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const [totalRatings, setTotalRatings] = useState(0);

  const handleOpen = (index) => {
    if (!images.length) return;
    setCurrentImage(index);
    setOpen(true);
  };

  const nextSlide = () => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const fetchWishlistStatus = async () => {
    try {
      const res = await api.get("/wishlist");

      const wishlist = res?.data?.wishlist || [];

      const existing = wishlist.find(
        (item) =>
          item?.destination?._id === destination?._id ||
          item?.destination === destination?._id,
      );

      if (existing) {
        setIsWishlisted(true);
        setWishlistId(existing._id);
      } else {
        setIsWishlisted(false);
        setWishlistId(null);
      }
    } catch (error) {
      console.log("Wishlist fetch error:", error);

      setIsWishlisted(false);
      setWishlistId(null);
    }
  };

  const fetchRatings = async () => {
    try {
      const res = await api.get(`/ratings/${destination._id}`);

      setAverageRating(res.data.averageRating || 0);

      setTotalRatings(res.data.totalRatings || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setOpenLogin(true);
        return;
      }
      if (isWishlisted) {
        await api.delete(`/wishlist/${wishlistId}`);

        setIsWishlisted(false);
        setWishlistId(null);

        return;
      }

      const res = await api.post("/wishlist", {
        destinationId: destination._id,
      });

      setIsWishlisted(true);
      setWishlistId(res.data.wishlist._id);
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // Wishlist logic
    const token = localStorage.getItem("accessToken");

    if (!token || !destination?._id) return;

    fetchWishlistStatus();
  }, [destination?._id]);

  useEffect(() => {
    // Rating logic
    if (!destination?._id) return;

    fetchRatings();
  }, [destination?._id]);

  return (
    <section className="w-full bg-white py-8">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-5 lg:px-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Tours</span>
          <span>&gt;</span>

          <span className="text-black font-medium">{destination?.name}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 mb-5">
          <button className="bg-orange-100 text-orange-500 text-xs font-medium px-4 py-2 rounded-full">
            Best seller
          </button>

          <button className="bg-gray-100 text-gray-700 text-xs font-medium px-4 py-2 rounded-full">
            Free cancellation
          </button>
        </div>

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-7">
          <div className="max-w-3xl">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
              {destination?.title}
            </h1>

            {/* Review */}
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span className="font-semibold text-black">
                  {averageRating} ({totalRatings} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{destination?.location}</span>
              </div>

              <div>
                <span className="font-semibold text-black">
                  {destination?.totalVisitors || "30K+"}
                </span>{" "}
                visitors
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <button className="flex items-center gap-2 hover:text-black transition">
              <Share2 size={17} />
              Share
            </button>

            <button
              onClick={handleWishlist}
              className="flex items-center gap-2 hover:text-black transition"
            >
              <Heart
                size={17}
                className={`transition-all duration-300 ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 hover:text-red-500"
                }`}
              />

              {isWishlisted ? "Saved" : "Wishlist"}
            </button>
          </div>
        </div>
        {/* Gallery */}
        {images.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
            {/* Left Big Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="lg:w-[57%] h-[280px] md:h-[450px] cursor-pointer overflow-hidden"
              onClick={() => handleOpen(0)}
            >
              <img
                src={images[0]}
                alt={destination?.name || "Destination"}
                className="w-full h-full object-cover rounded-[24px]"
              />
            </motion.div>

            {/* Right Images */}
            <div className="lg:w-[43%] h-[280px] md:h-[450px] grid grid-cols-2 grid-rows-2 gap-4 overflow-hidden">
              {images.slice(1, 5).map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full overflow-hidden cursor-pointer"
                  onClick={() => handleOpen(index + 1)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 2}`}
                    className="w-full h-full object-cover rounded-[20px]"
                  />

                  {/* Last Image Button */}
                  {index === 3 && images.length > 5 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(0);
                      }}
                      className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white text-xs px-4 py-2 rounded-xl backdrop-blur-md transition"
                    >
                      See all photos
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <div className="w-full h-[450px] rounded-3xl bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Modal Slider */}
      <AnimatePresence>
        {open && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={35} />
            </button>

            {/* Prev */}
            <button onClick={prevSlide} className="absolute left-5 text-white">
              <ChevronLeft size={45} />
            </button>

            {/* Image */}
            <motion.img
              key={images[currentImage]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={images[currentImage]}
              alt=""
              className="w-[90%] md:w-[70%] h-[70vh] object-cover rounded-3xl"
            />

            {/* Next */}
            <button onClick={nextSlide} className="absolute right-5 text-white">
              <ChevronRight size={45} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DestinationHero;
