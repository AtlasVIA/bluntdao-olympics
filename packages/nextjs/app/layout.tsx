import { Inter } from "next/font/google";
import ErrorBoundary from "../components/bluntdao-olympics/common/ErrorBoundary";
import Layout from "../components/bluntdao-olympics/layout/Layout";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BluntDAO Olympics",
  description: "Official website for the BluntDAO Olympics events and leaderboards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Layout>{children}</Layout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
