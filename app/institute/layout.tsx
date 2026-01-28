
import InstituteSidebar from "@/components/institute/InstituteSlidebar";
import React from "react";

const InstituteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-15 h-screen">
        <InstituteSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default InstituteLayout;
