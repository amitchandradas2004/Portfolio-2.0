"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  GitBranch,
  FileText,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Shield,
  ExternalLink,
  Home,
  Eye,
  Zap,
  Activity,
  Compass,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { useTheme } from "@/components/ThemeProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { ReadOnlyBanner } from "@/components/dashboard/ReadOnlyBanner";

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: "General",
    items: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Hero Section", href: "/dashboard/hero", icon: Sparkles, badge: "Main" },
    ],
  },
  {
    title: "Portfolio & Career",
    items: [
      { name: "Skills", href: "/dashboard/skills", icon: Cpu, badge: "Tech" },
      { name: "Experiences", href: "/dashboard/experiences", icon: Briefcase },
      { name: "Projects", href: "/dashboard/projects", icon: FolderGit2, badge: "Works" },
      { name: "Education", href: "/dashboard/education", icon: GraduationCap },
    ],
  },
];

// Flattened list for lookup
const allSidebarItems = sidebarGroups.flatMap((group) => group.items);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { role, isAdmin, isReadOnly } = useUserRole();
  const { theme, toggleTheme, isMounted } = useTheme();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Restore collapsed state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboard_sidebar_collapsed");
      if (stored !== null) {
        setIsCollapsed(stored === "true");
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboard_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  // Auth Protection
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const isDark = theme === "dark";

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/80 dark:bg-[#070a13]/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
            </div>
          </div>
          <p className="text-xs sm:text-sm font-bold tracking-wide text-slate-600 dark:text-slate-300">
            Initializing Dashboard Security...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const currentItem =
    allSidebarItems.find((item) =>
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(item.href)
    ) || allSidebarItems[0];

  const CurrentIcon = currentItem.icon;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed top-1/4 left-1/3 w-[650px] h-[650px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#070a13]/95 backdrop-blur-2xl sticky top-0 h-screen z-30 select-none shadow-sm"
      >
        {/* Brand Header */}
        <div className={`h-16 px-4 flex items-center border-b border-slate-200/80 dark:border-slate-800/80 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}>
          {!isCollapsed && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group font-bold tracking-tight text-slate-900 dark:text-white overflow-hidden"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-500/25 group-hover:rotate-6 transition-transform shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col min-w-0 whitespace-nowrap overflow-hidden"
                >
                  <span className="text-sm font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent truncate">
                    Portfolio Admin
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-sky-500 uppercase">
                    Control Panel
                  </span>
                </motion.div>
              </AnimatePresence>
            </Link>
          )}

          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={toggleSidebar}
            type="button"
            className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isCollapsed
                ? "border-sky-500/40 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 shadow-sm shadow-sky-500/10"
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-sky-500" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* User Status Profile Card */}
        <div className="p-3">
          <div
            className={`relative group rounded-2xl bg-gradient-to-b from-slate-100/90 to-slate-100/50 dark:from-[#0b0f19]/90 dark:to-[#0b0f19]/50 border border-slate-200/80 dark:border-slate-800/80 transition-all ${
              isCollapsed ? "p-2 flex justify-center" : "p-3.5"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0 whitespace-nowrap overflow-hidden">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-extrabold truncate text-slate-900 dark:text-white">
                      {user.name || "User"}
                    </p>
                    {isReadOnly ? (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
                        Demo
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>

            {/* Collapsed Hover Tooltip for User */}
            {isCollapsed && (
              <div className="fixed left-[92px] px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-[#0f172a] dark:text-slate-100 text-xs font-bold shadow-2xl border border-slate-700 dark:border-sky-500/40 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100] whitespace-nowrap space-y-0.5">
                <p className="text-white dark:text-sky-300 font-black">{user.name || "User"}</p>
                <p className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-4 custom-scrollbar">
          {sidebarGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 py-1 flex items-center justify-between whitespace-nowrap overflow-hidden">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {group.title}
                  </span>
                </div>
              ) : (
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-2" />
              )}

              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center ${
                      isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3.5 py-2.5"
                    } rounded-xl text-sm font-semibold transition-colors group ${
                      isActive
                        ? "text-sky-600 dark:text-sky-400 bg-sky-500/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                          isActive
                            ? "bg-sky-500/15 text-sky-500 dark:text-sky-400"
                            : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {!isCollapsed && (
                        <span className="truncate whitespace-nowrap">{item.name}</span>
                      )}
                    </div>

                    {!isCollapsed && item.badge && !isActive && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="sidebarActiveIndicator"
                        className="absolute right-0 w-1.5 h-6 rounded-l-full bg-gradient-to-b from-sky-400 to-blue-600 shadow-sm shadow-sky-500/50"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Floating Side Tooltip when Collapsed */}
                    {isCollapsed && (
                      <div className="fixed left-[90px] px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-[#0f172a] dark:text-slate-100 text-xs font-extrabold shadow-2xl border border-slate-700 dark:border-sky-500/40 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100] whitespace-nowrap">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Sidebar Actions */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1">
          <Link
            href="/"
            className={`relative flex items-center ${
              isCollapsed ? "justify-center p-2.5" : "gap-3 px-3.5 py-2.5"
            } rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group`}
          >
            <Home className="w-4 h-4 text-slate-400 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Back to Home</span>}
            {isCollapsed && (
              <div className="fixed left-[90px] px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-[#0f172a] dark:text-slate-100 text-xs font-extrabold shadow-2xl border border-slate-700 dark:border-sky-500/40 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100] whitespace-nowrap">
                Back to Home
              </div>
            )}
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`relative w-full flex items-center ${
              isCollapsed ? "justify-center p-2.5" : "gap-3 px-3.5 py-2.5"
            } rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer group`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
            {isCollapsed && (
              <div className="fixed left-[90px] px-3.5 py-2 rounded-xl bg-rose-950 text-rose-100 dark:bg-rose-900 dark:text-rose-100 text-xs font-extrabold shadow-2xl border border-rose-800 dark:border-rose-700/80 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100] whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navigation Header */}
        <header className="h-16 px-3 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#070a13]/85 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between gap-2 sm:gap-4 transition-colors duration-300">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
            {/* Hamburger Menu Trigger (Mobile) */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              type="button"
              className="lg:hidden p-2 sm:p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#0b0f19]/80 text-slate-700 dark:text-slate-200 cursor-pointer shrink-0"
              aria-label="Toggle navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation Trail */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold min-w-0">
              <span className="text-slate-400 dark:text-slate-500 hidden sm:inline shrink-0">
                Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:inline shrink-0" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900 dark:text-white font-extrabold bg-slate-100 dark:bg-[#0b0f19]/90 px-2.5 py-1.5 sm:px-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 min-w-0">
                <CurrentIcon className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none">{currentItem.name}</span>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Back to Home Shortcut */}
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-[#0b0f19]/80 hover:bg-slate-200/80 dark:hover:bg-[#111726] border border-slate-200 dark:border-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all group"
            >
              <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span>Back to Home</span>
            </Link>

            {/* Role Header Badge */}
            {isReadOnly ? (
              <div className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm">
                <Eye className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Demo Visitor</span>
                <span className="hidden min-[360px]:inline sm:hidden">Demo</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="hidden sm:inline">Admin Mode</span>
                <span className="hidden min-[360px]:inline sm:hidden">Admin</span>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#0b0f19]/80 hover:bg-slate-200/60 dark:hover:bg-[#111726] text-slate-700 dark:text-slate-200 transition-all cursor-pointer shrink-0"
            >
              {isMounted ? (
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </motion.div>
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Quick Logout Header Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="inline-flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Body Viewport with Framer Motion Page Transition */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {isReadOnly && <ReadOnlyBanner />}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer (Framer Motion) */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#070a13] border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-2xl"
            >
              <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
                  <div className="p-2 rounded-xl bg-sky-500 text-white shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-base">Dashboard Menu</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-[#0b0f19]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile User Status Profile Card */}
              <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="relative group rounded-2xl bg-slate-100/80 dark:bg-[#0b0f19]/90 border border-slate-200/80 dark:border-slate-800/80 p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-extrabold truncate text-slate-900 dark:text-white">
                          {user.name || "User"}
                        </p>
                        {isReadOnly ? (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
                            Demo
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
                {sidebarGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1.5">
                    <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {group.title}
                    </p>
                    {group.items.map((item) => {
                      const isActive =
                        item.href === "/dashboard"
                          ? pathname === "/dashboard"
                          : pathname.startsWith(item.href);

                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-sky-500" />
                            <span>{item.name}</span>
                          </div>
                          {isActive && <div className="w-2 h-2 rounded-full bg-sky-500" />}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>

                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Global Dashboard Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLoggingOut && setShowLogoutModal(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] xs:max-w-sm sm:max-w-md rounded-xl p-4 sm:p-7 bg-white dark:bg-[#070a13] border border-slate-200/80 dark:border-slate-800 shadow-2xl z-10 space-y-3 sm:space-y-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                    <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                      Confirm Log Out
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Are you sure you want to sign out?
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => setShowLogoutModal(false)}
                  className="p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Logging out will end your current session. You will need to log back in to access your portfolio management settings.
              </p>

              <div className="flex items-center justify-end gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => setShowLogoutModal(false)}
                  className="px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Log Out</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
