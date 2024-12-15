"use server";
import { prisma } from "@/lib/prisma";
import { isMobile, months } from "@/lib/utils";
import { headers } from "next/headers";

export async function updateMetrics({ id }: { id: string }) {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobile = isMobile(userAgent);
  const date = new Date();
  const currentMonth = months[date.getMonth()];
  const currentYear = date.getFullYear();

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      totalVisitor: {
        increment: 1,
      },
      totalDeviceBreakdown: {
        increment: 1,
      },
      totalDesktopView: {
        increment: !mobile ? 1 : 0,
      },
      totalMobileUserView: {
        increment: mobile ? 1 : 0,
      },
    },
  });

  const queryMonthsYear = await prisma.visitorViewPerMonth.findFirst({
    where: {
      month: currentMonth,
      year: currentYear,
    },
  });

  if (!queryMonthsYear) {
    await prisma.visitorViewPerMonth.create({
      data: {
        month: currentMonth,
        year: currentYear,
        totalViews: 1,
      },
    });
  } else {
    await prisma.visitorViewPerMonth.update({
      where: {
        id: queryMonthsYear.id,
      },
      data: {
        totalViews: {
          increment: 1,
        },
      },
    });
  }
}
