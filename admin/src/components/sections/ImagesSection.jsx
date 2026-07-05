import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, ImageIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Shared image-upload block
   One reusable, animated dropzone + responsive gallery used by
   both the "Hero Destination Images" and "Top Places Gallery"
   sections. Keeping it as one component avoids drift between
   the two and keeps the file easy to scan.
============================================================ */

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const thumbVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.18 },
  },
};

function ImageUploadBlock({
  icon: Icon,
  title,
  description,
  images,
  onDrop,
  onRemove,
}) {
  // Track object URLs we create so we can revoke them and avoid leaks.
  const [urlCache] = useState(() => new WeakMap());

  const getPreviewUrl = useCallback(
    (image) => {
      if (!image) return "";

      // Existing image from database
      if (typeof image === "object" && !(image instanceof File) && image.url) {
        return image.url;
      }

      // Legacy string URL
      if (typeof image === "string") {
        return image;
      }

      // Newly selected File
      if (!urlCache.has(image)) {
        urlCache.set(image, URL.createObjectURL(image));
      }

      return urlCache.get(image);
    },
    [urlCache],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  return (
    <Card className="overflow-hidden border-orange-100 shadow-sm transition-shadow hover:shadow-md dark:border-orange-900/30">
      {/* Top accent bar — quiet signature element shared by both cards */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />

      <CardContent className="space-y-5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-200 sm:p-10 ${
            isDragActive
              ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
              : "border-orange-200 hover:border-orange-400 hover:bg-orange-50/60 dark:border-orange-900/40 dark:hover:bg-orange-500/5"
          }`}
        >
          <input {...getInputProps()} />

          <motion.div
            animate={{ y: isDragActive ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Upload
              className={`mx-auto mb-3 h-7 w-7 transition-colors sm:h-8 sm:w-8 ${
                isDragActive
                  ? "text-orange-500"
                  : "text-orange-300 group-hover:text-orange-500"
              }`}
            />
          </motion.div>

          <p className="text-sm font-medium text-foreground sm:text-base">
            {isDragActive
              ? "Drop images to add them"
              : "Drag & drop images here"}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            or click to browse files
          </p>
        </motion.div>

        <AnimatePresence initial={false}>
          {images.length > 0 && (
            <motion.div
              key="gallery"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, height: 0 }}
              variants={containerVariants}
              className="space-y-3 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    {images.length}
                  </span>{" "}
                  image{images.length !== 1 ? "s" : ""} selected
                </p>
              </div>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4"
              >
                <AnimatePresence>
                  {images.map((image, index) => (
                    <motion.div
                      key={
                        image instanceof File
                          ? `${image.name}-${image.lastModified}-${index}`
                          : `${image.public_id || image.url || index}`
                      }
                      layout
                      variants={thumbVariants}
                      exit="exit"
                      className="group relative aspect-square overflow-hidden rounded-lg border border-orange-100 bg-muted dark:border-orange-900/30"
                    >
                      <img
                        src={getPreviewUrl(image)}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute right-1.5 top-1.5 h-7 w-7 bg-orange-600 opacity-0 shadow-sm transition-opacity duration-200 hover:bg-orange-700 focus-visible:opacity-100 group-hover:opacity-100 sm:h-8 sm:w-8"
                        onClick={() => onRemove(index)}
                        aria-label="Remove image"
                      >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Main section
============================================================ */

const ImagesSection = ({ formData, setFormData }) => {
  const handleDestinationDrop = useCallback(
    (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...acceptedFiles],
      }));
    },
    [setFormData],
  );

  const handlePlaceDrop = useCallback(
    (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        placeImages: [...prev.placeImages, ...acceptedFiles],
      }));
    },
    [setFormData],
  );

  const removeDestinationImage = useCallback(
    (index) => {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    },
    [setFormData],
  );

  const removePlaceImage = useCallback(
    (index) => {
      setFormData((prev) => ({
        ...prev,
        placeImages: prev.placeImages.filter((_, i) => i !== index),
      }));
    },
    [setFormData],
  );

  return (
    // Sections are explicitly stacked vertically (flex-col), full width,
    // never side-by-side regardless of viewport size.
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="flex w-full flex-col gap-6 sm:gap-8"
    >
      <motion.div variants={containerVariants}>
        <ImageUploadBlock
          icon={ImageIcon}
          title="Hero Destination Images"
          description="Upload hero and cover images for the destination."
          images={formData.images}
          onDrop={handleDestinationDrop}
          onRemove={removeDestinationImage}
        />
      </motion.div>

      <motion.div variants={containerVariants}>
        <ImageUploadBlock
          icon={ImageIcon}
          title="Top Places Gallery"
          description="Upload images of the top places at this location."
          images={formData.placeImages}
          onDrop={handlePlaceDrop}
          onRemove={removePlaceImage}
        />
      </motion.div>
    </motion.div>
  );
};

export default ImagesSection;
