"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Compass,
  UserCheck,
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn,
  Send,
  MessageSquare,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "demo",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Redirect authenticated user to dashboard
  useEffect(() => {
    if (!isPending && session?.user) {
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPending, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role || "demo",
      });
      if (error) {
        setErrorMsg(error.message || "Failed to create account. Please try again.");
      } else if (data) {
        setSuccessMsg("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  if (session?.user) {
    const user = session.user;
    return (
      <div className="min-h-screen relative flex items-center justify-center pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300 w-full">
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl relative z-10"
        >
          <LiquidGlassCard
            borderRadius="16px"
            blurIntensity="xl"
            glowIntensity="lg"
            shadowIntensity="lg"
            className="w-full relative overflow-hidden group !border-slate-300/40 dark:!border-slate-800/60"
          >
            <div className="p-6 sm:p-8 text-center space-y-6 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-sky-500/15 dark:bg-sky-400/15 text-sky-600 dark:text-sky-400 border border-sky-400/30 backdrop-blur-md mx-auto shadow-sm">
                <UserCheck className="w-8 h-8 shrink-0 text-sky-500" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Already Signed In</span>
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  You're Already Registered!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Signed in as <strong className="text-slate-800 dark:text-slate-100">{user.email}</strong>. You don't need to create another account.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 backdrop-blur-md flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Loader2 className="w-4 h-4 animate-spin text-sky-500 shrink-0" />
                <span>Redirecting to your dashboard...</span>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-sky-300/30 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Go to Dashboard Now</span>
                </button>

                <button
                  type="button"
                  disabled={isSigningOut}
                  onClick={async () => {
                    try {
                      setIsSigningOut(true);
                      await authClient.signOut();
                    } catch (e) {
                      console.error("Sign out error:", e);
                    } finally {
                      setIsSigningOut(false);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-sm font-semibold border border-rose-500/20 hover:border-rose-500/40 backdrop-blur-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSigningOut ? (
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  ) : (
                    <LogOut className="w-4 h-4 shrink-0" />
                  )}
                  <span>Sign Out to Register New Account</span>
                </button>
              </div>
            </div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300 w-full">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative z-10 mt-2 sm:mt-4"
      >
        <LiquidGlassCard
          borderRadius="16px"
          blurIntensity="xl"
          glowIntensity="lg"
          shadowIntensity="lg"
          className="w-full relative overflow-hidden group !border-slate-300/40 dark:!border-slate-800/60"
        >
          <div className="p-6 sm:p-8 md:p-10 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Portfolio Access</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500 shrink-0" />
                <span>Create Account</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Register to access your portfolio dashboard
              </p>
            </div>

            {/* Alert Banners */}
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2.5 backdrop-blur-md">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2.5 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* SIDE-BY-SIDE INPUTS FOR NAME AND EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* NAME FIELD */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-500 dark:text-sky-400 z-10">
                      <User className="w-4 h-4 shrink-0" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 backdrop-blur-md transition-all relative z-0"
                    />
                  </div>
                </div>

                {/* EMAIL FIELD */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-500 dark:text-sky-400 z-10">
                      <Mail className="w-4 h-4 shrink-0" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 backdrop-blur-md transition-all relative z-0"
                    />
                  </div>
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-500 dark:text-sky-400 z-10">
                    <Lock className="w-4 h-4 shrink-0" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 backdrop-blur-md transition-all relative z-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer z-10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-sky-500 shrink-0" />
                    ) : (
                      <Eye className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* ACTION BUTTONS WITH CONTACT PAGE GRADIENT BUTTON STYLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-sky-300/30 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Send className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/login?demo=true")}
                  className="w-full py-3.5 px-6 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 text-sm font-semibold border border-slate-300/40 dark:border-slate-700/50 hover:border-sky-400/50 backdrop-blur-md shadow-xs active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Demo Login</span>
                </button>
              </div>
            </form>

            {/* HORIZONTAL FOOTER WITH MATCHING CONTACT STYLE GLASS BUTTON */}
            <div className="mt-6 pt-5 border-t border-slate-300/40 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-400">
                Already have an account?
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/login"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 backdrop-blur-md transition-all active:scale-[0.98]"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/40 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 hover:border-sky-400/50 backdrop-blur-md transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </div>
  );
}