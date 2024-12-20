import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type PatchProject = {
  id: string;
};

export async function PATCH(req: Request) {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const data: PatchProject = await req.json();
  console.log(data);

  const queryProject = await prisma.project.findFirst({
    where: { id: data.id },
  });

  if (!queryProject)
    return NextResponse.json({
      message: "Project does not exists. Please try again.",
      status: "404",
    });

  const updatedProject = await prisma.project.update({
    where: {
      id: data.id,
    },
    data: data,
  });

  return NextResponse.json({ message: "Project updated successfully.", project: updatedProject });
}

type DeleteProject = {
  id: string;
};

export async function DELETE(req: Request) {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const data: DeleteProject = await req.json();

  const queryProject = await prisma.project.findFirst({
    where: { id: data.id },
  });

  if (!queryProject)
    return NextResponse.json({
      message: "Project does not exists. Please try again.",
      status: "404",
    });

  await prisma.project.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json({ message: "Project Deleted successfully." });
}
