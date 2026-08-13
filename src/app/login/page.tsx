"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Compass,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [demoTourClicked, setDemoTourClicked] = useState(false);

  const handleDemoTour = () => {
    setFormData({
      email: "demouser@gmail.com",
      password: "DemoUser2026",
    });
    setErrorMsg(null);
    setSuccessMsg("Demo credentials loaded successfully!");
    setDemoTourClicked(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("demo") === "true") {
        handleDemoTour();
      }
    }
  }, []);

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
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to sign in. Please check your credentials.");
      } else if (data) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-25 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Back to Home Link */}
      <div className="absolute top-30 sm:top-25 left-6 sm:left-8 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 backdrop-blur-md transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/10 dark:shadow-black/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Dashboard Auth</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Sign in to manage your portfolio settings
            </p>
          </div>

          {/* Alert Banners */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDemoTour}
              disabled={demoTourClicked || loading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-500" />
              <span>{demoTourClicked ? "Demo Credentials Loaded" : "Demo Login"}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Don't have an account yet?{" "}
              <Link
                href="/register"
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
