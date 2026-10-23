import { getAboutData } from "@/lib/getAboutData";
import { AboutDashboardClient } from "@/components/dashboard/AboutDashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutDashboardPage() {
  const initialData = await getAboutData();

  return <AboutDashboardClient initialData={initialData} />;
}
