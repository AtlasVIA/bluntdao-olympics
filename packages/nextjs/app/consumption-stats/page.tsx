import { ConsumptionStats } from "../../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Consumption Stats",
  description: "Detailed statistics on consumption methods and preferences",
};

export default function ConsumptionStatsPage() {
  return <ConsumptionStats />;
}
