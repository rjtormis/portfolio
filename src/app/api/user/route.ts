import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

type User = {
  name: string;
  email: string;
  password: string;
};
export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ message: "Please login.", status: 500 });
  }

  const data: User = await req.json();

  const queryUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (queryUser) {
    return NextResponse.json({ message: "User already exists. Please try again", status: 409 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(data.password, salt);
  const filteredData = {
    email: data.email,
    password: hashedPassword,
  };
  const newUser = await prisma.user.create({ data: filteredData });

  return NextResponse.json({ message: "Success", user: newUser, status: 200 });
}
