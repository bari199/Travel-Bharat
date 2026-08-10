import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ListChecks,
  Clock,
  Gauge,
  MapPin,
  Navigation,
  CalendarClock,
} from "lucide-react";
import { motion } from "framer-motion";




function FieldLabel({ icon: Icon, children }) {
  return (
    <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 text-orange-400" />}
      {children}
    </Label>
  );
}

const inputClasses =
  "border-orange-100 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40 dark:bg-transparent";

const selectTriggerClasses =
  "border-orange-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 hover:border-orange-300 transition-colors dark:border-orange-900/40 dark:bg-transparent";

const ActivityDetailsSection = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <ListChecks className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Activity Details
          </h2>
          <p className="text-sm text-muted-foreground">
            Duration, difficulty, and where to meet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Duration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >
          <FieldLabel icon={Clock}>Duration</FieldLabel>

          <Input
            placeholder="2 Hours"
            value={formData.duration}
            onChange={(e) =>
              setFormData({
                ...formData,

                duration: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Difficulty */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <FieldLabel icon={Gauge}>Difficulty</FieldLabel>

          <Select
            value={formData.difficulty}
            onValueChange={(value) =>
              setFormData({
                ...formData,

                difficulty: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-orange-100 shadow-lg">
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Challenging">Challenging</SelectItem>
              <SelectItem value="Difficult">Difficult</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
        >
          <FieldLabel icon={MapPin}>Location</FieldLabel>

          <Input
            placeholder="Solang Valley"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,

                location: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Meeting Point */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          <FieldLabel icon={Navigation}>Meeting Point</FieldLabel>

          <Input
            placeholder="Main Parking Area"
            value={formData.meetingPoint}
            onChange={(e) =>
              setFormData({
                ...formData,

                meetingPoint: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Opening Hours */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
          className="md:col-span-2"
        >
          <FieldLabel icon={CalendarClock}>Opening Hours</FieldLabel>

          <Input
            placeholder="09:00 AM - 05:00 PM"
            value={formData.openingHours}
            onChange={(e) =>
              setFormData({
                ...formData,

                openingHours: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityDetailsSection;