"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
}

const Heading = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
        {title}
      </h1>

      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
