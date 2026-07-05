import { X, Upload, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Business logic below (handleImageUpload, removeImage) is
   unchanged from the original — the same file input and the
   same setFormData shape are used. Only markup, structure,
   and styling are new.
============================================================ */

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const thumbVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.18 } },
};

const ActivityImagesSection = ({ formData, setFormData }) => {
  /* ============================================
      Image Upload
  ============================================ */

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    setFormData({
      ...formData,

      images: [...formData.images, ...files],
    });
  };

  /* ============================================
      Remove Image
  ============================================ */

  const removeImage = (index) => {
    setFormData({
      ...formData,

      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />

      <div className="space-y-5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
              Activity Images
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload photos that showcase this activity.
            </p>
          </div>
        </div>

        {/* Upload area — same file input, styled as a click-to-browse dropzone */}
        <motion.label
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 p-6 text-center transition-colors duration-200 hover:border-orange-400 hover:bg-orange-50/60 sm:p-10 dark:border-orange-900/40 dark:hover:bg-orange-500/5"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <Upload className="mx-auto mb-3 h-7 w-7 text-orange-300 transition-colors group-hover:text-orange-500 sm:h-8 sm:w-8" />

          <p className="text-sm font-medium text-foreground sm:text-base">
            Click to upload images
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            PNG, JPG or WEBP — multiple files supported
          </p>
        </motion.label>

        {/* Image Preview */}
        <AnimatePresence initial={false}>
          {formData.images.length > 0 && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-orange-600 dark:text-orange-400">
                  {formData.images.length}
                </span>{" "}
                image{formData.images.length !== 1 ? "s" : ""} selected
              </p>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
              >
                <AnimatePresence>
                  {formData.images.map((image, index) => {
                    const imageUrl =
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : image;

                    return (
                      <motion.div
                        key={
                          image instanceof File
                            ? `${image.name}-${image.lastModified}-${index}`
                            : `${image}-${index}`
                        }
                        layout
                        variants={thumbVariants}
                        exit="exit"
                        className="group relative aspect-square overflow-hidden rounded-lg border border-orange-100 bg-muted dark:border-orange-900/30"
                      >
                        <img
                          src={imageUrl}
                          alt={`Activity ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute right-1.5 top-1.5 h-7 w-7 bg-orange-600 opacity-0 shadow-sm transition-opacity duration-200 hover:bg-orange-700 focus-visible:opacity-100 group-hover:opacity-100 sm:h-8 sm:w-8"
                          onClick={() => removeImage(index)}
                          aria-label="Remove image"
                        >
                          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityImagesSection;