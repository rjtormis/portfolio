"use server";

import { headers } from "next/headers";

export interface DashboardData {
  totalDesktopView: string;
  totalDeviceBreakdown: string;
  totalEmailsReceived: string;
  totalMobileUserView: string;
  totalPageView: string;
  totalVisitor: string;
  totalProjects: string;
  months: {
    month: string;
    year: number;
    totalViews: number;
  }[];
}
export const fetchDashboardData = async (): Promise<{ data: DashboardData }> => {
  const response = await fetch(`${process.env.URL}/api/dashboard`, {
    method: "GET",
    headers: new Headers(await headers()),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  const data: DashboardData = await response.json(); // TypeScript ensures the response data matches the type
  return { data: data };
};
