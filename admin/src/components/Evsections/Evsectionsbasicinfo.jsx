import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import {
  MapPinned,
  Tag,
  Compass,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  IndianRupee,
  LayoutGrid,
} from "lucide-react";

import { getDestinations } from "@/services/destinationApi";

/* ===========================================================
   Animated Wrapper — same convention as ExperienceBasicInfoSection
=========================================================== */

const FormField = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ===========================================================
   Icon Input
=========================================================== */

const IconInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative group">
    <Icon
      size={15}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-stone-500
        group-focus-within:text-orange-500 dark:group-focus-within:text-orange-400 transition-colors pointer-events-none"
    />

    <Input
      {...props}
      className={`pl-9 h-10 rounded-xl border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900
        text-sm text-slate-800 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500
        focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-500/20 focus:border-orange-400 dark:focus:border-orange-500
        transition-all
        ${error ? "border-red-300 dark:border-red-500/50 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-500/20" : ""}
      `}
    />
  </div>
);

/* ===========================================================
   Fields
=========================================================== */

const FIELDS = [
  {
    name: "title",
    label: "Event Title",
    placeholder: "Kolkata Winter Food Festival",
    icon: Tag,
    required: true,
    colSpan: 2,
  },
  {
    name: "shortDescription",
    label: "Short Description",
    placeholder: "One line description shown inside cards.",
    icon: Compass,
    required: true,
    colSpan: 2,
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Millennium Park",
    icon: MapPin,
  },
  {
    name: "organizer",
    label: "Organizer",
    placeholder: "Tourism Department",
    icon: UserRound,
  },
  {
    name: "startTime",
    label: "Start Time",
    placeholder: "5:00 PM",
    icon: Clock3,
  },
  {
    name: "endTime",
    label: "End Time",
    placeholder: "9:00 PM",
    icon: Clock3,
  },
  {
    name: "ticketPrice",
    label: "Ticket Price",
    placeholder: "₹499",
    icon: IndianRupee,
    type: "number",
  },
];

/* ===========================================================
   Select Options
=========================================================== */

const CATEGORY_OPTIONS = [
  "Festival",
  "Cultural",
  "Music",
  "Food & Cuisine",
  "Adventure",
  "Religious",
  "Exhibition",
  "Sports",
];

/* ===========================================================
   Component
=========================================================== */

const EvsectionsBasicInfo = ({ formData, handleChange, errors = {} }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===========================================================
     Load Destinations
  =========================================================== */

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.destinations || []);
      } catch (error) {
        console.error("Failed to load destinations", error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  /* ===========================================================
     Select / Switch Adapters
  =========================================================== */

  const handleDestinationChange = (value) => {
    handleChange({ target: { name: "destination", value } });
  };

  const handleCategoryChange = (value) => {
    handleChange({ target: { name: "category", value } });
  };

  const selectedDestination = destinations.find(
    (d) => d._id === formData.destination,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-stone-900 rounded-2xl border border-slate-100 dark:border-stone-800 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-stone-800/60 border-b border-slate-100 dark:border-stone-800">
        <span className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
          <MapPinned size={16} className="text-orange-500 dark:text-orange-400" />
        </span>

        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-stone-100">
            Event Information
          </h2>
          <p className="text-xs text-slate-400 dark:text-stone-500 mt-1">
            Basic information about this event.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Destination */}
        <FormField>
          <div className="md:col-span-2">
            <Label className="text-xs font-semibold mb-2 text-slate-700 dark:text-stone-300">
              Destination
              <span className="text-red-500 ml-1">*</span>
            </Label>

            <Select
              value={formData.destination || ""}
              onValueChange={handleDestinationChange}
            >
              <SelectTrigger className="h-10 rounded-xl border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-slate-800 dark:text-stone-100">
                <SelectValue
                  placeholder={loading ? "Loading..." : "Select Destination"}
                >
                  {selectedDestination
                    ? selectedDestination.name
                    : loading && formData.destination
                      ? "Loading..."
                      : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="dark:bg-stone-900 dark:border-stone-700">
                {destinations.map((destination) => (
                  <SelectItem
                    key={destination._id}
                    value={destination._id}
                    className="dark:text-stone-100 dark:focus:bg-stone-800"
                  >
                    {destination.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.destination && (
              <p className="text-xs text-red-500 mt-2">{errors.destination}</p>
            )}
          </div>
        </FormField>

        {/* Event Date */}
        <FormField delay={0.03}>
          <div>
            <Label
              htmlFor="eventDate"
              className="text-xs font-semibold mb-2 flex items-center gap-1 text-slate-700 dark:text-stone-300"
            >
              Event Date
              <span className="text-red-500">*</span>
            </Label>

            <IconInput
              id="eventDate"
              name="eventDate"
              type="date"
              icon={CalendarDays}
              value={formData.eventDate || ""}
              onChange={handleChange}
              error={errors.eventDate}
            />

            {errors.eventDate && (
              <p className="text-xs text-red-500 mt-2">{errors.eventDate}</p>
            )}
          </div>
        </FormField>

        {/* Category */}
        <FormField delay={0.05}>
          <div>
            <Label className="text-xs font-semibold mb-2 flex items-center gap-1 text-slate-700 dark:text-stone-300">
              Category
            </Label>

            <Select value={formData.category || ""} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-slate-800 dark:text-stone-100">
                <span className="flex items-center gap-2 text-sm">
                  <LayoutGrid size={15} className="text-slate-400 dark:text-stone-500" />
                  <SelectValue placeholder="Select Category" />
                </span>
              </SelectTrigger>

              <SelectContent className="dark:bg-stone-900 dark:border-stone-700">
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="dark:text-stone-100 dark:focus:bg-stone-800"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormField>

        {/* Dynamic Fields */}
        {FIELDS.map((field, index) => (
          <FormField key={field.name} delay={0.06 + index * 0.05}>
            <div className={field.colSpan === 2 ? "md:col-span-2" : ""}>
              <Label
                htmlFor={field.name}
                className="text-xs font-semibold mb-2 flex items-center gap-1 text-slate-700 dark:text-stone-300"
              >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>

              <IconInput
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                icon={field.icon}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                error={errors[field.name]}
              />

              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-2">{errors[field.name]}</p>
              )}
            </div>
          </FormField>
        ))}

        {/* Featured Event */}
        <FormField delay={0.45}>
          <div className="md:col-span-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-stone-700 p-4 bg-slate-50 dark:bg-stone-800/60">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-stone-200">
                  Featured Event
                </h4>
                <p className="text-xs text-slate-400 dark:text-stone-500 mt-1">
                  Display this event in the featured section on the website.
                </p>
              </div>

              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  handleChange({ target: { name: "featured", value: checked } })
                }
              />
            </div>
          </div>
        </FormField>
      </div>

      {/* Progress */}
      {(() => {
        const keys = [
          "destination",
          "title",
          "shortDescription",
          "eventDate",
          "location",
          "organizer",
          "startTime",
          "endTime",
          "ticketPrice",
          "category",
        ];

        const filled = keys.filter((key) => {
          if (typeof formData[key] === "boolean") return true;
          return formData[key] && String(formData[key]).trim() !== "";
        }).length;

        const total = keys.length;
        const percent = Math.round((filled / total) * 100);

        return (
          <div className="px-6 pb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-500 dark:text-stone-400">
                Section Progress
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-stone-300">
                {filled} / {total}
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100 dark:bg-stone-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-500"
              />
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
};

export default EvsectionsBasicInfo;