import { Events } from "../../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Events",
  description: "Track all competitions and events in the Blunt Olympics",
};

export default function EventsPage() {
  return <Events />;
}
