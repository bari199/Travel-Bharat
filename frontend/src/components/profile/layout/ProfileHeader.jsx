import { ChevronRight } from "lucide-react";

export default function ProfileHeader({ activeNav }) {
  if (!activeNav) return null;

  const Icon = activeNav.Icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 shadow-sm">

      {/* Icon */}

      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          bg-orange-100
          dark:bg-orange-500/20
        "
      >
        <Icon
          className={`h-5 w-5 ${activeNav.color}`}
        />
      </div>

      {/* Title */}

      <div className="flex flex-col">

        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Dashboard
        </span>

        <h2 className="text-lg font-bold text-foreground">
          {activeNav.label}
        </h2>

      </div>

      {/* Right Arrow */}

      <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />

    </div>
  );
}