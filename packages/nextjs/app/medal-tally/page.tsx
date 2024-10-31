import MedalTally from "../../components/bluntdao-olympics/screens/MedalTally";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Medal Tally",
  description: "Track the medal count and standings for the Blunt Olympics",
};

export default function MedalTallyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MedalTally />
    </div>
  );
}
