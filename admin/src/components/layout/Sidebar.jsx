import {
  LayoutDashboard,
  MapPinned,
  Earth,
  Tent,
  Footprints,
  Users,
  MessageSquare,
  Star,
  Heart,
  ThumbsUp,
  User,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_SECTIONS = [
  {
    label: "ADMIN",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard },
      {
        name: "Destinations",
        path: "/destinations",
        icon: MapPinned,
        badge: "48",
      },
      {
        name: "Experiences",
        path: "/experiences",
        icon: Earth,
        badge: "24",
      },
      { name: "Events", path: "/events", icon: Tent, badge: "12" },
      {
        name: "Activities",
        path: "/activities",
        icon: Footprints,
        badge: "36",
      },
      { name: "Users", path: "/users", icon: Users },
    ],
  },
  {
    label: "SOCIAL",
    items: [
      { name: "Comments", path: "/comments", icon: MessageSquare, badge: "12" },
      { name: "Ratings", path: "/ratings", icon: Star },
      { name: "Wishlist", path: "/wishlist", icon: Heart },
      { name: "Reactions", path: "/reactions", icon: ThumbsUp },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Profile", path: "/profile", icon: User },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

const sidebarVariants = {
  expanded: { width: 240 },
  collapsed: { width: 60 },
};

const labelVariants = {
  expanded: { opacity: 1, width: "auto", marginLeft: 0 },
  collapsed: { opacity: 0, width: 0, marginLeft: 0 },
};

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const state = collapsed ? "collapsed" : "expanded";

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.aside
        variants={sidebarVariants}
        animate={state}
        transition={{ duration: 0.1, ease: [0.1, 0, 0.1, 0] }}
        className="flex flex-col fixed h-screen bg-gradient-to-br from-stone-900 via-stone-900 to-neutral-900 overflow-hidden shrink-0 z-40"
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            TB
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="logo-text"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-sm font-bold text-orange-50 leading-tight">
                  Travel Bharat
                </p>
                <p className="text-[10px] text-stone-400 leading-tight">
                  Admin Console
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-2 overflow-y-auto overflow-x-hidden py-4 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.p
                    key={`label-${section.label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="px-4 mb-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500"
                  >
                    {section.label}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="space-y-0 px-2">
                {section.items.map(({ name, path, icon: Icon, badge }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={path}
                        end={path === "/"}
                        className={({ isActive }) =>
                          `group flex items-center gap-8 px-3 py-2 rounded-[9px] text-[13.5px] font-medium transition-colors relative overflow-hidden
                          ${
                            isActive
                              ? "bg-orange-500/10 text-orange-400"
                              : "text-stone-400 hover:bg-white/[0.06] hover:text-stone-200"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.span
                                layoutId="active-pill"
                                className="absolute inset-0 rounded-[9px] bg-orange-500/10"
                                transition={{
                                  type: "spring",
                                  bounce: 0.2,
                                  duration: 0.4,
                                }}
                              />
                            )}
                            {/* Active bar */}
                            {isActive && (
                              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500" />
                            )}
                            <Icon
                              size={17}
                              className="shrink-0 relative z-10"
                              aria-hidden="true"
                            />
                            <motion.span
                              variants={labelVariants}
                              animate={state}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden whitespace-nowrap truncate flex-1 min-w-0 relative z-10"
                            >
                              {name}
                            </motion.span>
                            {badge && !collapsed && (
                              <motion.span
                                variants={labelVariants}
                                animate={state}
                                transition={{ duration: 0.2 }}
                                className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 relative z-10"
                              >
                                {badge}
                              </motion.span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="text-xs">
                        {name}
                        {badge && (
                          <span className="ml-1.5 text-orange-400">
                            ({badge})
                          </span>
                        )}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/[0.06] p-2 space-y-1">
          {/* Admin card */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="admin-card"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] bg-white/[0.04] mb-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    A
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-200 truncate">
                      Admin User
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      Super Admin
                    </p>
                  </div>
                  <ChevronRight
                    size={13}
                    className="text-stone-600 shrink-0 ml-auto"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logout */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[9px] text-[13.5px] font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={17} className="shrink-0" aria-hidden="true" />
                <motion.span
                  variants={labelVariants}
                  animate={state}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap truncate min-w-0"
                >
                  Logout
                </motion.span>
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="text-xs">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default Sidebar;
