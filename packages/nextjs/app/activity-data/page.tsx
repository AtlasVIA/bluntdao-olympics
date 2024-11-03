import { ActivityData } from "../../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Activity Data",
  description: "Track all events and activities in the Blunt Olympics",
};

export default function ActivityDataPage() {
  return <ActivityData />;
}
