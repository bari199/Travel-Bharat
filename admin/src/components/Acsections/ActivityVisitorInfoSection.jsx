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
  Users,
  IndianRupee,
  Baby,
  UserCheck,
  Gauge,
  CalendarRange,
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

const ActivityVisitorInfoSection = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 dark:border-orange-900/30 dark:bg-background">
      {/* Top accent bar — matches the signature treatment used elsewhere */}
      <div className="-mx-4 -mt-4 h-1 w-[calc(100%+2rem)] rounded-t-xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Users className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
            Visitor Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Pricing, age limits, and fitness expectations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >
          <FieldLabel icon={IndianRupee}>Price (₹)</FieldLabel>

          <Input
            type="number"
            placeholder="2500"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,

                price: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Minimum Age */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <FieldLabel icon={Baby}>Minimum Age</FieldLabel>

          <Input
            type="number"
            placeholder="12"
            value={formData.minimumAge}
            onChange={(e) =>
              setFormData({
                ...formData,

                minimumAge: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Maximum Age */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
        >
          <FieldLabel icon={UserCheck}>Maximum Age</FieldLabel>

          <Input
            type="number"
            placeholder="60"
            value={formData.maximumAge}
            onChange={(e) =>
              setFormData({
                ...formData,

                maximumAge: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>

        {/* Fitness Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          <FieldLabel icon={Gauge}>Fitness Level</FieldLabel>

          <Select
            value={formData.fitnessLevel}
            onValueChange={(value) =>
              setFormData({
                ...formData,

                fitnessLevel: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select Fitness Level" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-orange-100 shadow-lg">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Best Time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
          className="md:col-span-2"
        >
          <FieldLabel icon={CalendarRange}>Best Time</FieldLabel>

          <Input
            placeholder="March - June"
            value={formData.bestTime}
            onChange={(e) =>
              setFormData({
                ...formData,

                bestTime: e.target.value,
              })
            }
            className={inputClasses}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityVisitorInfoSection;