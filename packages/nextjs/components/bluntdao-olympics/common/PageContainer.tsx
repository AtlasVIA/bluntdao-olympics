import React from "react";

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, description, children, className = "" }) => {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content">{title}</h1>
          {description && <p className="mt-2 text-base-content/70">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
