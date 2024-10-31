import { Inter } from "next/font/google";
import ErrorBoundary from "../components/bluntdao-olympics/common/ErrorBoundary";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import "~~/styles/globals.css";
import { walletConnectStyles } from "~~/styles/rainbowKit";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blunt Olympics",
  description: "Official website for the Blunt Olympics events and leaderboards",
  icons: {
    icon: "/bluntolympicscut.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: walletConnectStyles }} />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
