import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const queryUser = await prisma.user.findFirst({
    where: {
      email: session.user!.email!,
    },
    select: {
      totalDesktopView: true,
      totalDeviceBreakdown: true,
      totalEmailsReceived: true,
      totalMobileUserView: true,
      totalPageView: true,
      totalVisitor: true,
      totalProjects: true,
    },
  });
  const months = await prisma.visitorViewPerMonth.findMany({});

  if (!queryUser) return NextResponse.json({ message: "User does not exists." });

  return NextResponse.json({
    totalDesktopView: queryUser.totalDesktopView,
    totalDeviceBreakdown: queryUser.totalDeviceBreakdown,
    totalEmailsReceived: queryUser.totalEmailsReceived,
    totalMobileUserView: queryUser.totalMobileUserView,
    totalPageView: queryUser.totalPageView,
    totalVisitor: queryUser.totalVisitor,
    totalProjects: queryUser.totalProjects,
    months: months,
  });
}
