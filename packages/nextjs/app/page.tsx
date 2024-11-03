import { Home } from "../components/bluntdao-olympics/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blunt Olympics",
  description: "The premier competitive cannabis consumption platform",
};

export default function HomePage() {
  return <Home />;
}
