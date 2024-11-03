import { PopularActivities } from "../../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Popular Activities",
  description: "Most popular activities and events in the Blunt Olympics",
};

export default function PopularActivitiesPage() {
  return <PopularActivities />;
}
