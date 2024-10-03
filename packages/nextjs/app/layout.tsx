import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import ErrorBoundary from "../components/bluntdao-olympics/common/ErrorBoundary";
import Layout from "../components/bluntdao-olympics/layout/Layout";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BluntDAO Olympics",
  description: "Official website for the BluntDAO Olympics events and leaderboards",
};

const ThemeProviderWrapper = dynamic(() => import("../components/ThemeProviderWrapper"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <ErrorBoundary>
            <Layout>{children}</Layout>
          </ErrorBoundary>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
