import Leaderboard from "../../components/bluntdao-olympics/leaderboard/Leaderboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BluntDAO Olympics Leaderboard",
  description: "View the latest standings, statistics, and medal tally for the BluntDAO Olympics",
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Leaderboard />
    </div>
  );
}
