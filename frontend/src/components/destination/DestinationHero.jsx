import React, { useState } from "react";
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

const DestinationHero = () => {

  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  ];

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleOpen = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const nextSlide = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

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

          <span className="text-black font-medium">
            Phuket
          </span>
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
              Molokini and Turtle Town Snorkeling Adventure Aboard
            </h1>

            {/* Review */}
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>

                <span className="font-semibold text-black">
                  4.8 (243)
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>New York, USA</span>
              </div>

              <div>
                <span className="font-semibold text-black">
                  30K+
                </span>{" "}
                booked
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 text-sm text-gray-600">

            <button className="flex items-center gap-2 hover:text-black transition">
              <Share2 size={17} />
              Share
            </button>

            <button className="flex items-center gap-2 hover:text-black transition">
              <Heart size={17} />
              Wishlist
            </button>

          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Left Big Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="lg:w-[57%] h-[280px] md:h-[450px] cursor-pointer"
            onClick={() => handleOpen(0)}
          >
            <img
              src={images[0]}
              alt=""
              className="w-full h-full object-cover rounded-[24px]"
            />
          </motion.div>

          {/* Right Images */}
          <div className="lg:w-[43%] grid grid-cols-2 gap-4 h-[280px] md:h-[340px]">

            {images.slice(1).map((img, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
                onClick={() => handleOpen(index + 1)}
              >

                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-[20px]"
                />

                {/* Last Image Button */}
                {index === 3 && (
                  <button
                    className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white text-xs px-4 py-2 rounded-xl backdrop-blur-md transition"
                  >
                    See all photos
                  </button>
                )}

              </motion.div>

            ))}

          </div>
        </div>
      </div>

      {/* Modal Slider */}
      <AnimatePresence>

        {open && (

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
            <button
              onClick={prevSlide}
              className="absolute left-5 text-white"
            >
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
            <button
              onClick={nextSlide}
              className="absolute right-5 text-white"
            >
              <ChevronRight size={45} />
            </button>

          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
};

export default DestinationHero;