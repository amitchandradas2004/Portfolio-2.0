import { getSkillsData } from "@/lib/getSkillsData";
import { SkillsDashboardClient } from "@/components/dashboard/SkillsDashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SkillsDashboardPage() {
  const initialData = await getSkillsData();

  return <SkillsDashboardClient initialData={initialData} />;
}
