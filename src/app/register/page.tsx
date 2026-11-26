import RegisterPageUI from "@/components/auth/RegisterPageUI";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Portfolio Access",
  description:
    "Create an account to access the portfolio dashboard, manage projects, and configure settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <RegisterPageUI />;
}
