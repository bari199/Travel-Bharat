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
import {
  MapPinned, Tag, Map, Building2,
  Layers, Navigation, Ruler,
} from "lucide-react";

/* ── Category options matching Travel Bharat regions ── */
const CATEGORIES = [
  "Beach", "Mountain", "Heritage", "Forest",
  "Desert", "Wildlife", "Spiritual", "Hill Station",
  "Waterfall", "Lake", "Adventure", "Cultural",
];

/* ── Category color dots ── */
const CATEGORY_COLORS = {
  Beach:        "bg-sky-400",
  Mountain:     "bg-indigo-400",
  Heritage:     "bg-amber-400",
  Forest:       "bg-emerald-400",
  Desert:       "bg-orange-400",
  Wildlife:     "bg-lime-500",
  Spiritual:    "bg-purple-400",
  "Hill Station":"bg-cyan-400",
  Waterfall:    "bg-blue-400",
  Lake:         "bg-teal-400",
  Adventure:    "bg-rose-400",
  Cultural:     "bg-pink-400",
};

/* ── Field config ── */
const FIELDS = [
  {
    name: "name",
    label: "Destination Name",
    placeholder: "e.g. Manali",
    icon: MapPinned,
    hint: "The primary display name of the destination",
    required: true,
    colSpan: 2,
  },
  {
    name: "title",
    label: "Page Title",
    placeholder: "e.g. Manali — Gateway to the Himalayas",
    icon: Tag,
    hint: "SEO-friendly title shown in search results",
    required: true,
    colSpan: 2,
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. Himachal Pradesh",
    icon: Map,
    required: true,
  },
  {
    name: "city",
    label: "City / Town",
    placeholder: "e.g. Manali",
    icon: Building2,
    required: true,
  },
  {
    name: "location",
    label: "Location / Address",
    placeholder: "e.g. Old Manali, Kullu District",
    icon: Navigation,
    hint: "Specific address or landmark description",
  },
  {
    name: "area",
    label: "Area / Zone",
    placeholder: "e.g. Kullu Valley",
    icon: Ruler,
    hint: "Broader geographical zone or taluka",
  },
];

/* ── Animated field wrapper ── */
const FormField = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ── Styled input with icon ── */
const IconInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative group">
    <Icon
      size={15}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none"
    />
    <Input
      {...props}
      className={`pl-9 h-10 text-sm bg-white border-slate-200 rounded-xl
        placeholder:text-slate-400 text-slate-800
        focus:border-sky-400 focus:ring-2 focus:ring-sky-100
        hover:border-slate-300 transition-all duration-200
        ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""}
      `}
    />
  </div>
);

/* ════════════════════════════════════════════════════════════ */
const BasicInfoSection = ({ formData, handleChange, errors = {} }) => {
  /* Adapter so Select onChange matches handleChange signature */
  const handleSelectChange = (value) =>
    handleChange({ target: { name: "category", value } });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <span className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
          <MapPinned size={16} className="text-sky-500" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Basic Information</h2>
          <p className="text-xs text-slate-400 mt-0.5">Core details about the destination</p>
        </div>
        <span className="ml-auto text-xs text-slate-400">
          <span className="text-rose-400">*</span> Required fields
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        {FIELDS.map(({ name, label, placeholder, icon, hint, required, colSpan }, i) => (
          <FormField key={name} delay={i * 0.05}>
            <div className={colSpan === 2 ? "md:col-span-2" : ""}>
              <Label
                htmlFor={name}
                className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"
              >
                {label}
                {required && <span className="text-rose-400 text-[10px]">*</span>}
              </Label>
              <IconInput
                id={name}
                name={name}
                icon={icon}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={handleChange}
                error={errors[name]}
              />
              {errors[name] ? (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
                  {errors[name]}
                </p>
              ) : hint ? (
                <p className="text-xs text-slate-400 mt-1.5">{hint}</p>
              ) : null}
            </div>
          </FormField>
        ))}

        {/* ── Category — full-width Select ── */}
        <FormField delay={FIELDS.length * 0.05}>
          <div className="md:col-span-2">
            <Label
              htmlFor="category"
              className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"
            >
              <Layers size={12} className="text-slate-400" />
              Category
              <span className="text-rose-400 text-[10px]">*</span>
            </Label>
            <Select
              value={formData.category || ""}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger
                id="category"
                className="h-10 text-sm bg-white border-slate-200 rounded-xl
                  focus:border-sky-400 focus:ring-2 focus:ring-sky-100
                  hover:border-slate-300 transition-all duration-200
                  text-slate-700 data-[placeholder]:text-slate-400"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                {CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-sm rounded-lg cursor-pointer focus:bg-sky-50 focus:text-sky-700"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_COLORS[cat] ?? "bg-slate-400"}`}
                      />
                      {cat}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
                {errors.category}
              </p>
            )}
          </div>
        </FormField>
      </div>

      {/* ── Progress hint at bottom ── */}
      {(() => {
        const filled = [...FIELDS.map((f) => f.name), "category"]
          .filter((k) => formData[k]?.trim()).length;
        const total = FIELDS.length + 1;
        const pct = Math.round((filled / total) * 100);
        return (
          <div className="px-6 pb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">Section progress</span>
              <span className="text-xs font-semibold text-slate-500">{filled}/{total} filled</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
};

export default BasicInfoSection;