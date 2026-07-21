import { ChevronRight, PanelLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ProfileHeader({ activeNav }) {
  if (!activeNav) return null;

  const Icon = activeNav.Icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-2.5 shadow-sm sm:px-5 sm:py-3">
      <SidebarTrigger className="h-9 w-9 shrink-0 rounded-xl border border-orange-100 text-stone-500 hover:bg-orange-50 hover:text-orange-600 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-orange-400">
        <PanelLeft className="h-4 w-4" />
      </SidebarTrigger>

      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
          Dashboard
        </span>
        <h2 className="truncate text-base font-bold text-foreground sm:text-lg">
          {activeNav.label}
        </h2>
      </div>

      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
    </div>
  );
}