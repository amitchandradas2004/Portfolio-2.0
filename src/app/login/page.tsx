import LoginPageUI from "@/components/auth/LoginPageUI";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | Dashboard Auth",
  description:
    "Sign in to access your portfolio dashboard, manage projects, and configure settings.",
  robots: {
    index: false,
    follow: false,
  },
};

function LoginFallback() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading login...
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginPageUI />
    </Suspense>
  );
}
