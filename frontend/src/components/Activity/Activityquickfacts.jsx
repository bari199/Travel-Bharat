import React from "react";
import {
  Clock,
  Gauge,
  Compass,
  Users,
  Activity as ActivityIcon,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Fact = React.memo(function Fact({ icon: Icon, label, value }) {
  return (
    <Card className="border-orange-100">
      <CardContent className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5 text-orange-500" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
});

const ActivityQuickFacts = ({ activity }) => {
  const ageRange =
    activity.minimumAge || activity.maximumAge
      ? `${activity.minimumAge ?? 0} – ${activity.maximumAge ?? 100} yrs`
      : "All ages";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <Fact icon={Clock} label="Duration" value={activity.duration || "Flexible"} />
      <Fact icon={Gauge} label="Difficulty" value={activity.difficulty || "Easy"} />
      <Fact icon={Compass} label="Type" value={activity.activityType || "Outdoor"} />
      <Fact icon={Users} label="Age range" value={ageRange} />
      <Fact icon={ActivityIcon} label="Fitness" value={activity.fitnessLevel || "Beginner"} />
      <Fact icon={CalendarDays} label="Best time" value={activity.bestTime || "Year-round"} />
    </div>
  );
};

export default ActivityQuickFacts;