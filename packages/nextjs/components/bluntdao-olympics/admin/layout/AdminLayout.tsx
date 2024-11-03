"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageContainer } from "../../common";

interface AdminLayoutProps {
  children: ReactNode;
}

const ADMIN_SECTIONS = [
  { id: "participants", label: "Participants", icon: "👥" },
  { id: "events", label: "Events", icon: "🎯" },
  { id: "consumption", label: "Consumption", icon: "📊" },
  { id: "scoring", label: "Scoring", icon: "🏆" },
] as const;

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSection = ADMIN_SECTIONS.find(section => pathname?.includes(section.id)) || ADMIN_SECTIONS[0];

  return (
    <PageContainer title="Admin Dashboard" description="Manage participants, events, and scoring">
      <div className="flex flex-col space-y-6">
        {/* Navigation */}
        <div className="flex space-x-4 bg-base-200 p-4 rounded-lg">
          {ADMIN_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => router.push(`/admin/${section.id}`)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection.id === section.id ? "bg-primary text-primary-content" : "hover:bg-base-300"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-base-200 p-6 rounded-lg">{children}</div>
      </div>
    </PageContainer>
  );
};
