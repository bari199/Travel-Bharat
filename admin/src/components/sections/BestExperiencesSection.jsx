import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  MapPin,
  Clock,
  Timer,
  Tag,
  ImageIcon,
  Link as LinkIcon,
  Compass,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";



const cardVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  show: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

function FieldLabel({ icon: Icon, children }) {
  return (
    <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 text-orange-400" />}
      {children}
    </Label>
  );
}

function ExperienceImagePicker({ image, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
      onChange(e);
    },
    [onChange]
  );

  const resolvedPreview = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (image instanceof File) return URL.createObjectURL(image);
    if (typeof image === "string" && image) return image;
    return null;
  }, [previewUrl, image]);

  return (
    <div>
      <FieldLabel icon={ImageIcon}>Experience Image</FieldLabel>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-lg border border-dashed border-orange-200 bg-orange-50/50 dark:border-orange-900/40 dark:bg-orange-500/5">
          {resolvedPreview ? (
            <img
              src={resolvedPreview}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-orange-300" />
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer border-orange-100 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-orange-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-orange-700 hover:file:bg-orange-200 dark:border-orange-900/40 dark:file:bg-orange-500/10 dark:file:text-orange-400"
        />
      </div>
    </div>
  );
}

const BestExperiencesSection = ({ formData, setFormData }) => {
  const addExperience = () => {
    setFormData({
      ...formData,
      bestExperiences: [
        ...formData.bestExperiences,
        {
          title: "",
          subtitle: "",
          description: "",
          location: "",
          distance: "",
          bestTime: "",
          duration: "",
          offer: "",
          highlights: [],
          image: null,
          buttonLink: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = [...formData.bestExperiences];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      bestExperiences: updated,
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.bestExperiences];

    updated[index][field] = value;

    setFormData({
      ...formData,
      bestExperiences: updated,
    });
  };

  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <Compass className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
              Best Experiences
            </h2>
            <p className="text-sm text-muted-foreground">
              Showcase the must-try experiences at this destination.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={addExperience}
          className="w-full bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800 sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <motion.div layout className="space-y-5">
        <AnimatePresence initial={false}>
          {formData.bestExperiences.map((experience, index) => (
            <motion.div
              key={index}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="overflow-hidden rounded-xl border border-orange-100 bg-orange-50/30 dark:border-orange-900/30 dark:bg-orange-500/[0.03]"
            >
              <div className="space-y-5 p-4 sm:p-5">
                {/* Card header */}
                <div className="flex items-center justify-between gap-3 border-b border-orange-100 pb-3 dark:border-orange-900/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="truncate text-sm font-medium text-foreground">
                      {experience.title || experience.subtitle || "New experience"}
                    </p>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeExperience(index)}
                    className="flex-none bg-orange-600/90 hover:bg-orange-700"
                  >
                    <Trash2 className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Remove</span>
                  </Button>
                </div>

                {/* Title & subtitle */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Experience Title</FieldLabel>
                    <Input
                      placeholder="e.g. Sunrise Trek to the Ridge"
                      value={experience.title}
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>

                  <div>
                    <FieldLabel>Subtitle</FieldLabel>
                    <Input
                      placeholder="e.g. A breathtaking start to the day"
                      value={experience.subtitle}
                      onChange={(e) =>
                        handleChange(index, "subtitle", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>
                </div>

                {/* Logistics row */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <FieldLabel icon={MapPin}>Location</FieldLabel>
                    <Input
                      placeholder="Location"
                      value={experience.location}
                      onChange={(e) =>
                        handleChange(index, "location", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>

                  <div>
                    <FieldLabel icon={Compass}>Distance</FieldLabel>
                    <Input
                      placeholder="e.g. 5 km"
                      value={experience.distance}
                      onChange={(e) =>
                        handleChange(index, "distance", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>

                  <div>
                    <FieldLabel icon={Clock}>Best Time</FieldLabel>
                    <Input
                      placeholder="e.g. Early Morning"
                      value={experience.bestTime}
                      onChange={(e) =>
                        handleChange(index, "bestTime", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>

                  <div>
                    <FieldLabel icon={Timer}>Duration</FieldLabel>
                    <Input
                      placeholder="e.g. 2 hours"
                      value={experience.duration}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>
                </div>

                {/* Offer badge */}
                <div className="sm:w-1/2 sm:pr-2">
                  <FieldLabel icon={Tag}>Offer Badge</FieldLabel>
                  <Input
                    placeholder="e.g. 20% Off"
                    value={experience.offer}
                    onChange={(e) =>
                      handleChange(index, "offer", e.target.value)
                    }
                    className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                  />
                </div>

                {/* Description */}
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border border-orange-100 p-3 text-sm transition-colors focus-visible:border-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent dark:focus-visible:ring-orange-500/20"
                    placeholder="Describe what makes this experience special"
                    value={experience.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </div>

                {/* Highlights */}
                <div>
                  <FieldLabel>Highlights (comma separated)</FieldLabel>
                  <textarea
                    rows={2}
                    className="w-full rounded-md border border-orange-100 p-3 text-sm transition-colors focus-visible:border-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent dark:focus-visible:ring-orange-500/20"
                    placeholder="e.g. Guided tour, Photo stops, Local snacks"
                    value={experience.highlights?.join(", ")}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "highlights",
                        e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                  {experience.highlights?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {experience.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image + Button link */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <ExperienceImagePicker
                    image={experience.image}
                    onChange={(e) =>
                      handleChange(index, "image", e.target.files[0])
                    }
                  />

                  <div>
                    <FieldLabel icon={LinkIcon}>Button Link</FieldLabel>
                    <Input
                      placeholder="https://example.com/book"
                      value={experience.buttonLink}
                      onChange={(e) =>
                        handleChange(index, "buttonLink", e.target.value)
                      }
                      className="border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {formData.bestExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-dashed border-orange-200 bg-orange-50/50 p-6 text-center text-sm text-muted-foreground dark:border-orange-900/40 dark:bg-orange-500/5"
          >
            No experiences added yet — click "Add Experience" to create one.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BestExperiencesSection;