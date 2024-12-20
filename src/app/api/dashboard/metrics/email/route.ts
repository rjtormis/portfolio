import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

/*Method:PATCH
 * Route: /api/dashboard/metrics/email
 * Description: Updates the email metrics of the user
 */
export async function PATCH() {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ message: "Please login.", status: "404" });
  }
  const email = process.env.EMAIL as string;
  const queryUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!queryUser) {
    return NextResponse.json({ message: "No user registered", status: "404" });
  }
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      totalEmailsReceived: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ message: "Email metric successfully updated." });
}
