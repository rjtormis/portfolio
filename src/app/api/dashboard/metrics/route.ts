import { NextResponse } from "next/server";
import { updateMetrics } from "@/app/actions/metrics";
import { prisma } from "@/lib/prisma";

/*Method:GET
 * Route: /api/dashboard/metrics
 * Description: Updates the metrics of the user
 */
export async function GET() {
  const email = process.env.EMAIL as string;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    await updateMetrics({ id: user.id });
    return NextResponse.json({ message: "Metrics updated." });
  }

  return NextResponse.json({ message: "No user registered" });
}
