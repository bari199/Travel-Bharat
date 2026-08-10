import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Compass,
  MapPin,
  Tag,
  Link as LinkIcon,
  Layers,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";

import { getDestinations } from "@/services/destinationApi";



function FieldLabel({ icon: Icon, children }) {
  return (
    <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 text-orange-400" />}
      {children}
    </Label>
  );
}

const selectTriggerClasses =
  "border-orange-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 hover:border-orange-300 transition-colors dark:border-orange-900/40 dark:bg-transparent";

const inputClasses =
  "border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent";

const ActivityBasicInfoSection = ({ formData, setFormData }) => {
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);

  const selectedDestination = destinations.find(
    (d) =>
      d._id ===
      (typeof formData.destination === "object"
        ? formData.destination._id
        : formData.destination),
  );
  /* ============================================
      Fetch Destinations
  ============================================ */

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations();

        setDestinations(response.destinations || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Compass className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Basic Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Core details that identify this activity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Destination */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >
          <FieldLabel icon={MapPin}>Destination</FieldLabel>

          <Select
            value={formData.destination}
            onValueChange={(value) =>
              setFormData({
                ...formData,

                destination: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue
                placeholder={
                  loading ? "Loading destinations..." : "Select Destination"
                }
              >
                {selectedDestination
                  ? `${selectedDestination.name} • ${selectedDestination.city}`
                  : loading && formData.destination
                    ? "Loading..."
                    : undefined}
              </SelectValue>
            </SelectTrigger>

            <SelectContent className="rounded-xl border-orange-100 shadow-lg ">
              {destinations.map((destination) => (
                <SelectItem
                  key={destination._id}
                  value={destination._id}
                  className="dark:text-stone-100 dark:focus:bg-stone-800"
                >
                  {destination.name}
                  {" • "}
                  {destination.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <FieldLabel icon={Tag}>Activity Title</FieldLabel>

          <Input
            placeholder="Paragliding Adventure"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,

                title: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>
      </div>

      {/* Slug */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
      >
        <FieldLabel icon={LinkIcon}>Slug</FieldLabel>

        <Input
          placeholder="paragliding-adventure"
          value={formData.slug}
          onChange={(e) =>
            setFormData({
              ...formData,

              slug: e.target.value,
            })
          }
          className={inputClasses}
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          <FieldLabel icon={Layers}>Category</FieldLabel>

          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({
                ...formData,

                category: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-orange-100 shadow-lg">
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Nature">Nature</SelectItem>
              <SelectItem value="Wildlife">Wildlife</SelectItem>
              <SelectItem value="Water Sports">Water Sports</SelectItem>
              <SelectItem value="Snow">Snow</SelectItem>
              <SelectItem value="Camping">Camping</SelectItem>
              <SelectItem value="Trekking">Trekking</SelectItem>
              <SelectItem value="Spiritual">Spiritual</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Sightseeing">Sightseeing</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Activity Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
        >
          <FieldLabel icon={Navigation}>Activity Type</FieldLabel>

          <Select
            value={formData.activityType}
            onValueChange={(value) =>
              setFormData({
                ...formData,

                activityType: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select Activity Type" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-orange-100 shadow-lg">
              <SelectItem value="Outdoor">Outdoor</SelectItem>
              <SelectItem value="Indoor">Indoor</SelectItem>
              <SelectItem value="Guided">Guided</SelectItem>
              <SelectItem value="Self Guided">Self Guided</SelectItem>
              <SelectItem value="Group">Group</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityBasicInfoSection;
