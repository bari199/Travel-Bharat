import { useState, useCallback } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Upload, ImageIcon, X } from "lucide-react";

import { useDropzone } from "react-dropzone";

import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   Animation Variants
============================================================ */

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  show: {
    opacity: 1,

    y: 0,

    transition: {
      duration: 0.35,

      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const gridVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const thumbVariants = {
  hidden: {
    opacity: 0,

    scale: 0.9,
  },

  show: {
    opacity: 1,

    scale: 1,
  },

  exit: {
    opacity: 0,

    scale: 0.85,
  },
};

/* ============================================================
   Upload Block
============================================================ */

function ImageUploadBlock({
  images,

  onDrop,

  onRemove,
}) {
  const [cache] = useState(() => new WeakMap());

  const getPreview = useCallback(
    (image) => {
      if (typeof image === "string") return image;

      if (!cache.has(image)) {
        cache.set(image, URL.createObjectURL(image));
      }

      return cache.get(image);
    },

    [cache],
  );

  const {
    getRootProps,

    getInputProps,

    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [],
    },

    multiple: true,

    onDrop,
  });

  return (
    <Card
      className="
border-orange-100
shadow-sm
overflow-hidden
"
    >
      <div
        className="
h-1
bg-gradient-to-r
from-orange-500
to-amber-500
"
      />

      <CardContent
        className="
space-y-5
p-6
"
      >
        <div
          className="
flex
items-start
gap-3
"
        >
          <div
            className="
w-10
h-10
rounded-xl
bg-orange-100
flex
items-center
justify-center
"
          >
            <ImageIcon
              className="
w-5
h-5
text-orange-600
"
            />
          </div>

          <div>
            <h2
              className="
text-lg
font-semibold
"
            >
              Experience Gallery
            </h2>

            <p
              className="
text-sm
text-slate-500
"
            >
              Upload beautiful images of this experience.
            </p>
          </div>
        </div>

        <motion.div
          {...getRootProps()}
          whileHover={{
            scale: 1.01,
          }}
          className={`
rounded-xl
border-2
border-dashed
cursor-pointer
text-center
p-10
transition

${
  isDragActive
    ? "border-orange-500 bg-orange-50"
    : "border-orange-200 hover:border-orange-400"
}

`}
        >
          <input {...getInputProps()} />

          <Upload
            className="
mx-auto
mb-3
w-8
h-8
text-orange-400
"
          />

          <p
            className="
font-medium
"
          >
            {isDragActive ? "Drop images here" : "Drag & Drop Images"}
          </p>

          <p
            className="
text-sm
text-slate-500
"
          >
            or click to browse
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
              className="space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-orange-600">
                    {images.length}
                  </span>{" "}
                  image{images.length !== 1 ? "s" : ""} selected
                </p>
              </div>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  gap-4
                "
              >
                <AnimatePresence>
                  {images.map((image, index) => (
                    <motion.div
                      key={
                        image instanceof File
                          ? `${image.name}-${image.lastModified}-${index}`
                          : `${image}-${index}`
                      }
                      layout
                      variants={thumbVariants}
                      exit="exit"
                      className="
relative
group
aspect-square
overflow-hidden
rounded-xl
border
border-orange-100
"
                    >
                      <img
                        src={getPreview(image)}
                        alt="Experience"
                        className="
w-full
h-full
object-cover
transition-transform
duration-300
group-hover:scale-105
"
                      />

                      <div
                        className="
absolute
inset-0
bg-black/30
opacity-0
group-hover:opacity-100
transition
"
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="
absolute
top-2
right-2
w-8
h-8
opacity-0
group-hover:opacity-100
transition
bg-orange-600
hover:bg-orange-700
"
                        onClick={() => onRemove(index)}
                      >
                        <X className="w-4 h-4" />
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
   Experience Images Section
============================================================ */

const ExperienceImagesSection = ({ formData, setFormData }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,

        images: [...prev.images, ...acceptedFiles],
      }));
    },

    [setFormData],
  );

  const removeImage = useCallback(
    (index) => {
      setFormData((prev) => ({
        ...prev,

        images: prev.images.filter((_, i) => i !== index),
      }));
    },

    [setFormData],
  );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},

        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div variants={containerVariants}>
        <ImageUploadBlock
          images={formData.images}
          onDrop={handleDrop}
          onRemove={removeImage}
        />
      </motion.div>
    </motion.div>
  );
};

export default ExperienceImagesSection;
