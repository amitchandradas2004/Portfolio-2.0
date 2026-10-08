import React from "react";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <DashboardSkeleton />
    </div>
  );
}
