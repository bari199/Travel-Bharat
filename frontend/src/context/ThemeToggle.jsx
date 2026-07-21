import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";

/**
 * Light/dark toggle built on shadcn's <Switch>. Meant to sit in the
 * navbar's right-side action cluster, next to the avatar/auth buttons.
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Sun
        className={`h-4 w-4 transition-colors ${
          isDark ? "text-gray-400 dark:text-slate-500" : "text-orange-500"
        }`}
      />

      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="
          data-[state=checked]:bg-slate-800
          data-[state=unchecked]:bg-orange-300
          border border-black/5 dark:border-white/10
          [&>span]:bg-white
          [&>span]:shadow-md
        "
      />

      <Moon
        className={`h-4 w-4 transition-colors ${
          isDark ? "text-orange-300" : "text-gray-400"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;