import { Leaderboard } from "../../components/bluntdao-olympics/leaderboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics Leaderboard",
  description: "View rankings and achievements across all Blunt Olympics categories",
};

export default function LeaderboardPage() {
  return <Leaderboard />;
}
