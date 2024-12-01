import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

export default DashboardLayout;
