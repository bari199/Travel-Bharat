import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ActivityGallery = ({ activity }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = activity?.images || [];

  if (!images.length) return null;

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Images className="text-orange-500" />
        <h2 className="text-xl sm:text-2xl font-bold">Activity Gallery</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={() => openImage(index)}
            className="cursor-pointer group overflow-hidden rounded-2xl h-32 sm:h-52"
          >
            <img
              src={image}
              alt="activity"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent
          showCloseButton
          className="max-w-[95vw] sm:max-w-4xl bg-black/95 border-none p-0 overflow-hidden"
        >
          <div className="relative flex items-center justify-center min-h-[50vh]">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 sm:left-4 text-white hover:bg-white/10 hover:text-white z-10"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
            </Button>

            <AnimatePresence mode="wait">
              {selectedImage !== null && (
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  src={images[selectedImage]}
                  alt=""
                  className="max-h-[80vh] max-w-[85vw] rounded-xl"
                />
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 sm:right-4 text-white hover:bg-white/10 hover:text-white z-10"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ActivityGallery;