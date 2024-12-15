import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type User = {
  name: string;
  email: string;
  password: string;
};
export async function PATCH(req: Request) {
  const data: User = await req.json();

  const queryUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!queryUser) {
    return NextResponse.json({ message: "User already exists. Please try again", status: 409 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(data.password, salt);
  const updateUser = await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Password updated successfully.",
    user: updateUser,
    status: 200,
  });
}
