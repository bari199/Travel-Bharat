import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plane, Clock, Ticket, Star } from "lucide-react";

/* ── Animated field wrapper ─────────────────────────────── */
const FormField = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ── Icon input ─────────────────────────────────────────── */
const IconInput = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <Icon
      size={15}
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400
        group-focus-within:text-sky-500 transition-colors pointer-events-none"
    />
    <Input
      {...props}
      className="pl-9 h-10 text-sm bg-white border-slate-200 rounded-xl
        placeholder:text-slate-400 text-slate-800
        focus:border-sky-400 focus:ring-2 focus:ring-sky-100
        hover:border-slate-300 transition-all duration-200"
    />
  </div>
);

/* ════════════════════════════════════════════════════════════ */
const TravelInfoSection = ({ formData, handleChange }) => {
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
          <Plane size={16} className="text-sky-500" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Travel Information</h2>
          <p className="text-xs text-slate-400 mt-0.5">Practical details for visitors</p>
        </div>
      </div>

      {/* ── Fields ── */}
      <div className="p-6 space-y-5">

        {/* Best Time To Visit */}
        <FormField delay={0.05}>
          <Label
            htmlFor="bestTimeToVisit"
            className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5"
          >
            <Clock size={12} className="text-slate-400" />
            Best Time to Visit
          </Label>
          <IconInput
            id="bestTimeToVisit"
            name="bestTimeToVisit"
            icon={Clock}
            placeholder="e.g. October to March"
            value={formData.bestTimeToVisit}
            onChange={handleChange}
          />
          <p className="text-xs text-slate-400 mt-1.5">
            Recommended months or seasons for the best experience
          </p>
        </FormField>

        {/* Entry Fee */}
        <FormField delay={0.1}>
          <Label
            htmlFor="entryFee"
            className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5"
          >
            <Ticket size={12} className="text-slate-400" />
            Entry Fee
          </Label>
          <IconInput
            id="entryFee"
            name="entryFee"
            icon={Ticket}
            placeholder="e.g. ₹50 per person / Free entry"
            value={formData.entryFee}
            onChange={handleChange}
          />
          <p className="text-xs text-slate-400 mt-1.5">
            Admission charges for adults — mention "Free" if no fee applies
          </p>
        </FormField>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Featured toggle */}
        <FormField delay={0.15}>
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <Star size={15} className="text-amber-500 fill-amber-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Featured Destination</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Featured destinations appear in the homepage spotlight and top search results
                </p>
              </div>
            </div>

            {/* shadcn Switch — same business logic as the original checkbox */}
            <Switch
              id="featured"
              checked={!!formData.featured}
              onCheckedChange={(checked) =>
                handleChange({
                  target: {
                    name: "featured",
                    value: checked,
                  },
                })
              }
              className="data-[state=checked]:bg-amber-500 shrink-0 mt-1"
            />
          </div>
        </FormField>

      </div>
    </motion.div>
  );
};

export default TravelInfoSection;