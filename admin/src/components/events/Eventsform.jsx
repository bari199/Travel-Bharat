import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  FileText,
  ImageIcon,
  Upload,
  X,
  Check,
  Loader2,
  RotateCcw,
} from "lucide-react";

import EvsectionsBasicInfo from "../Evsections/Evsectionsbasicinfo";

import { initialEventData } from "./InitialeventsData";

import { createEvent, updateEvent } from "@/services/eventsApi";

/* ===========================================================
   Image preview helper — event images are stored as plain
   Cloudinary URL strings on the backend, but the form also
   needs to preview freshly-picked File objects before upload.
=========================================================== */

const getPreviewUrl = (image, cache) => {
  if (!image) return "";
  if (typeof image === "string") return image;

  if (image instanceof File || image instanceof Blob) {
    if (!cache.has(image)) {
      cache.set(image, URL.createObjectURL(image));
    }
    return cache.get(image);
  }

  return image.url || image.secure_url || "";
};

/* ===========================================================
   Component
=========================================================== */

const EventsForm = ({ initialData = null, isEdit = false, eventId = null, onSuccess }) => {
  const [formData, setFormData] = useState(initialEventData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewCache] = useState(() => new WeakMap());

  /* ===========================================================
     Edit Mode
  =========================================================== */

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialEventData,
        ...initialData,
      });
    }
  }, [isEdit, initialData]);

  /* ===========================================================
     Handle Input Change
  =========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ===========================================================
     Images
  =========================================================== */

  const handleDrop = useCallback((acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));

    setErrors((prev) => ({ ...prev, images: "" }));
  }, []);

  const removeImage = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: handleDrop,
  });

  /* ===========================================================
     Validation
  =========================================================== */

  const validate = () => {
    const newErrors = {};

    if (!formData.destination) newErrors.destination = "Destination is required.";
    if (!formData.title?.trim()) newErrors.title = "Title is required.";
    if (!formData.shortDescription?.trim())
      newErrors.shortDescription = "Short description is required.";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required.";
    if (!formData.description?.trim())
      newErrors.description = "Description is required.";
    if (!formData.images || formData.images.length === 0)
      newErrors.images = "Upload at least one image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===========================================================
     Reset
  =========================================================== */

  const resetForm = () => {
    setFormData(initialEventData);
    setErrors({});
  };

  /* ===========================================================
     Submit
  =========================================================== */

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix the validation errors before continuing.");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateEvent(eventId, formData);
        toast.success(response?.message || "Event updated successfully.");
      } else {
        response = await createEvent(formData);
        toast.success(response?.message || "Event created successfully.");
        resetForm();
      }

      if (onSuccess) onSuccess(response);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const characterCount = formData.description?.length || 0;

  return (
    <div className="space-y-6 max-w-[860px] pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-stone-100">
          {isEdit ? "Edit Event" : "Add Event"}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-stone-400">
          Fill in the details below to create a new event listing.
        </p>
      </div>

      {/* Basic Info */}
      <EvsectionsBasicInfo
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      {/* Description */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="shadow-sm border border-sky-100 dark:border-sky-500/20 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />

          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-stone-100">
                  Event Description
                </h2>
                <p className="text-sm text-slate-500 dark:text-stone-400">
                  Write a detailed description of this event.
                </p>
              </div>
            </div>

            <Label htmlFor="description" className="font-medium">
              Description
              <span className="text-red-500 ml-1">*</span>
            </Label>

            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event — what to expect, schedule highlights, entry details, and why visitors shouldn't miss it."
              rows={8}
              className={`min-h-[200px] resize-none rounded-xl leading-7
                ${errors.description ? "border-red-400 focus-visible:ring-red-300" : ""}`}
            />

            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-stone-500">
              <span>Recommended length</span>
              <span>{characterCount} characters</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Images */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card
          className={`shadow-sm overflow-hidden ${
            errors.images
              ? "border-red-300 dark:border-red-500/40"
              : "border-orange-100 dark:border-orange-900/30"
          }`}
        >
          <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />

          <CardContent className="space-y-5 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-stone-100">
                  Event Gallery
                </h2>
                <p className="text-sm text-slate-500 dark:text-stone-400">
                  Upload images of this event.
                </p>
              </div>
            </div>

            <motion.div
              {...getRootProps()}
              whileHover={{ scale: 1.01 }}
              className={`rounded-xl border-2 border-dashed cursor-pointer text-center p-10 transition
                ${isDragActive ? "border-orange-500 bg-orange-50 dark:bg-orange-500/5" : "border-orange-200 dark:border-orange-900/40 hover:border-orange-400"}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-3 w-8 h-8 text-orange-400" />
              <p className="font-medium text-slate-700 dark:text-stone-200">
                {isDragActive ? "Drop images here" : "Drag & Drop Images"}
              </p>
              <p className="text-sm text-slate-500 dark:text-stone-400">
                or click to browse
              </p>
            </motion.div>

            {errors.images && (
              <p className="text-sm text-red-500">{errors.images}</p>
            )}

            <AnimatePresence initial={false}>
              {formData.images.length > 0 && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <p className="text-sm text-slate-500 dark:text-stone-400">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {formData.images.length}
                    </span>{" "}
                    image{formData.images.length !== 1 ? "s" : ""} selected
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {formData.images.map((image, index) => (
                        <motion.div
                          key={
                            image instanceof File
                              ? `${image.name}-${image.lastModified}-${index}`
                              : `${image}-${index}`
                          }
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          className="relative group aspect-square overflow-hidden rounded-xl border border-orange-100 dark:border-orange-900/30"
                        >
                          <img
                            src={getPreviewUrl(image, previewCache)}
                            alt="Event"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition bg-orange-600 hover:bg-orange-700"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onSuccess && onSuccess()}
            className="h-10 px-4 text-sm font-semibold border-slate-200 dark:border-stone-700 text-slate-500 dark:text-stone-400
              hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-700 dark:hover:text-stone-200 rounded-xl gap-2"
          >
            <X size={16} />
            Cancel
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to reset the form?",
              );
              if (!confirmed) return;
              resetForm();
            }}
            className="h-10 px-4 text-sm font-semibold border-slate-200 dark:border-stone-700 text-slate-500 dark:text-stone-400
              hover:bg-slate-50 dark:hover:bg-stone-800 hover:text-slate-700 dark:hover:text-stone-200 rounded-xl gap-2"
          >
            <RotateCcw size={15} />
            Reset
          </Button>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="h-10 px-6 text-sm font-semibold bg-amber-600 hover:bg-amber-700
            text-white rounded-xl gap-2 shadow-sm shadow-amber-200 dark:shadow-none disabled:opacity-70 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              {isEdit ? "Updating…" : "Creating…"}
            </>
          ) : (
            <>
              <Check size={15} />
              {isEdit ? "Update Event" : "Create Event"}
            </>
          )}
        </Button>
      </motion.div>

      {Object.keys(errors).length > 0 && (
        <p className="text-xs font-medium text-red-500 text-center sm:text-left">
          Please fix the validation errors before continuing.
        </p>
      )}
    </div>
  );
};

export default EventsForm;