"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useSession } from "@/lib/auth-client";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, isMounted } = useTheme();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuthenticated = !!session?.user;

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    isAuthenticated
      ? { name: "Dashboard", href: "/dashboard" }
      : { name: "Login", href: "/login" },
  ];

  // Smooth scroll listener
  useEffect(() => {
    const handleNavbarScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll();
    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, []);

  // Track active scroll section on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return;

    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();

      const cssDurationStr = getComputedStyle(document.documentElement)
        .getPropertyValue("--scroll-duration")
        .trim();
      const duration = parseFloat(cssDurationStr) || 800;

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - 90;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.history.pushState(null, "", `#${targetId}`);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = isMounted ? theme === "dark" : false;

  if (pathname?.startsWith("/dashboard")) return null;

  const isNavItemActive = (itemHref: string) => {
    if (itemHref.includes("#")) {
      const targetId = itemHref.split("#")[1];
      return pathname === "/" && activeSection === targetId;
    }
    if (itemHref === "/") return pathname === "/";
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "pt-4 px-4 sm:px-6 lg:px-8 xl:px-12" : "pt-0 px-0"
        }`}
    >
      <div className="w-full container mx-auto flex items-center justify-center pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          style={{
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isMounted
              ? isScrolled
                ? isDark
                  ? "rgba(15, 23, 42, 0.65)"
                  : "rgba(255, 255, 255, 0.65)"
                : "transparent"
              : "transparent",
            borderColor: isMounted
              ? isScrolled
                ? isDark
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(203, 213, 225, 0.5)"
                : "transparent"
              : "transparent",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          }}
          className={`relative flex items-center justify-between h-16 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isScrolled
              ? "px-6 sm:px-8 border shadow-lg shadow-slate-900/5 dark:shadow-black/20"
              : "px-6 sm:px-10 lg:px-12 border-b border-transparent shadow-none"
            }`}
        >
          {/* Top Specular Edge Shine Highlight */}
          <div
            className={`pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/40 dark:via-white/20 to-transparent transition-opacity duration-700 ${isScrolled ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Left: Logo */}
          <div className="flex items-center z-10">
            <Link
              href="/"
              className="group flex items-center gap-2 tracking-tight transition-transform duration-200 hover:scale-[1.02] focus:outline-none rounded-full p-1"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 via-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/25 group-hover:rotate-6 transition-transform duration-300 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent group-hover:from-sky-500 group-hover:to-blue-600 dark:group-hover:from-sky-400 dark:group-hover:to-blue-400 transition-all duration-300 text-base sm:text-lg lg:text-xl font-extrabold whitespace-nowrap">
                Amit Chandra Das
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
            <ul
              className={`flex items-center space-x-1 p-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                  ? "bg-white/30 dark:bg-slate-900/40 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-md shadow-xs"
                  : "bg-transparent border border-transparent"
                }`}
            >
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);

                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-200 rounded-full block focus:outline-none ${isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavbarIndicator"
                          className="absolute inset-0 z-[-1] rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border border-slate-300/50 dark:border-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 z-10">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              type="button"
              className="relative p-2.5 rounded-full border border-slate-300/40 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-300 focus:outline-none active:scale-95 cursor-pointer shadow-xs"
            >
              {isMounted ? (
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex items-center justify-center"
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

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-dropdown-menu"
              aria-label="Toggle navigation menu"
              type="button"
              className="lg:hidden p-2.5 rounded-full border border-slate-300/40 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-300 focus:outline-none active:scale-95 cursor-pointer shadow-xs"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Glassmorphic Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="w-full px-4 sm:px-6 pointer-events-auto">
            <motion.div
              id="mobile-dropdown-menu"
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: isMounted
                  ? isDark
                    ? "rgba(15, 23, 42, 0.75)"
                    : "rgba(255, 255, 255, 0.75)"
                  : "rgba(15, 23, 42, 0.75)",
                borderColor: isMounted
                  ? isDark
                    ? "rgba(255, 255, 255, 0.14)"
                    : "rgba(203, 213, 225, 0.6)"
                  : "rgba(255, 255, 255, 0.14)",
              }}
              className="lg:hidden rounded-2xl p-2.5 border backdrop-blur-2xl shadow-2xl shadow-slate-900/15 dark:shadow-black/60 overflow-hidden container mx-auto relative"
            >
              {/* Top Specular Edge Highlight */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/50 dark:via-white/25 to-transparent" />

              <ul className="flex flex-col space-y-1.5 relative z-10">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(item.href);

                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`relative z-10 flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${isActive
                            ? "text-sky-600 dark:text-sky-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          }`}
                      >
                        <span className="tracking-wide">{item.name}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${isActive
                              ? "text-sky-500 translate-x-0.5"
                              : "text-slate-400/50"
                            }`}
                        />
                      </Link>

                      {/* Animated Floating Glass Underlay for Active Nav Item */}
                      {isActive && (
                        <motion.div
                          layoutId="mobileGlassUnderlay"
                          className="absolute inset-0 z-0 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-white/10 shadow-sm backdrop-blur-xl"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}