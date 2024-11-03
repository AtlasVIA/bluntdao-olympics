import { MedalTally } from "../../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Medal Tally",
  description: "Track medal counts and achievements in the Blunt Olympics",
};

export default function MedalTallyPage() {
  return <MedalTally />;
}
