"use client";

import React from "react";
import { Footer, Header } from "../common";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-weed-light dark:bg-weed-dark text-weed-dark dark:text-weed-light transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
