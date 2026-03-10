import { fetchAllMembers } from "@/lib/supabase/queries/members";
import { SAMPLE_MEMBERS } from "@/data/members";
import MembersClient from "@/components/members/MembersClient";

export const revalidate = 3600;

export default async function MembersPage() {
  const members = await fetchAllMembers();
  const data = members && members.length > 0 ? members : SAMPLE_MEMBERS;

  return <MembersClient members={data} />;
}
