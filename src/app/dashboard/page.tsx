import React from "react";

import Dashboard from "./dashboard";
import { fetchDashboardData } from "../actions/dashboard";

export default async function DashboardPage() {
  const { data } = await fetchDashboardData();
  return (
    <>
      <Dashboard data={data} />
    </>
  );
}
