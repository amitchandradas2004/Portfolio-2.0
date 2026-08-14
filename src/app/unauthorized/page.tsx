import type { Metadata } from "next";
import React from "react";
import UnauthorizedView from "@/components/UnauthorizedView";

export const metadata: Metadata = {
  title: "401 Unauthorized | Amit Chandra Das Portfolio",
  description:
    "Access denied. Authentication is required to view this protected portfolio resource.",
};

export default function UnauthorizedPage() {
  return <UnauthorizedView />;
}
