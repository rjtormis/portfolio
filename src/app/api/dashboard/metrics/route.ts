import { NextResponse } from "next/server";
import { updateMetrics } from "@/app/actions/metrics";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findMany({});

  if (user.length >= 1) {
    await updateMetrics({ id: user[0].id });
    return NextResponse.json({ message: "Metrics updated." });
  }

  return NextResponse.json({ message: "No user registered" });
}
