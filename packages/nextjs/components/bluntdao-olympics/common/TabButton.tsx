import { ReactNode } from "react";
import Link from "next/link";

interface TabButtonProps {
  children: ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export const TabButton = ({ children, isActive, href, onClick }: TabButtonProps) => {
  const className = `px-4 py-2 rounded-lg font-medium transition-colors ${
    isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
