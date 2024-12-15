"use client";
import React from "react";

function Container({ children, mobile }: { children: React.ReactNode; mobile: boolean }) {
  return <div className={`flex flex-col ${mobile ? "px-12" : "px-40"}`}>{children}</div>;
}

export default Container;
