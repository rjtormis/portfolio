import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  PutObjectCommand,
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { capitalizeFirstLetter } from "@/lib/utils";

// Set AWS credentials
const client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export async function GET() {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const projects = await prisma.project.findMany({
    where: {
      createdById: session.user.id,
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const form = await req.formData();

  // Get all images since its a File[]
  const images = form.getAll("images") as File[];

  const data = {
    name: capitalizeFirstLetter(form.get("name") as string),
    description: form.get("description") as string,
    short_description: form.get("short_description") as string,
    techstack: form.getAll("techstack") as unknown as string[],
    github: form.get("github") as string,
    live: form.get("live") as string,
    status: "active",
  };

  const queryProject = await prisma.project.findFirst({
    where: {
      name: form.get("name") as string,
    },
  });

  if (queryProject) {
    return NextResponse.json({ message: "Project already exists.", status: 409 });
  }

  const createProject = await prisma.project.create({
    data: { ...data, images: [], createdById: session.user.id },
  });

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      totalProjects: {
        increment: 1,
      },
    },
  });

  await prisma.project.update({
    where: {
      id: createProject.id,
    },
    data: {
      images: images.map((i) => `${createProject.id}/${i.name}`),
    },
  });

  // Create new folder in AWS S3
  const newFolder = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${createProject.id}/`,
  });
  await client.send(newFolder);

  // eslint-disable-next-line prefer-const

  await Promise.all(
    images.map(async (image) => {
      // Get Presigned url for authentication and security
      const { url, fields } = await createPresignedPost(client, {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `${createProject.id}/${image.name}`,
      });

      // Create a new form data and append the necessary headers,attributes and etc
      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataS3.append(key, value);
      });

      formDataS3.append("file", image);
      // Upload the images to AWS s3
      await fetch(url, { method: "POST", body: formDataS3 });
    })
  );

  return NextResponse.json({ message: "Project created successfully.", project: createProject });
}
type DeleteProject = {
  ids: string[];
};

export async function DELETE(req: Request) {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json({
      message: "Please login",
      status: "404",
    });

  const data: DeleteProject = await req.json();

  await Promise.all(
    data.ids.map(async (id) => {
      try {
        const deleteProject = new ListObjectsV2Command({
          Bucket: process.env.AWS_BUCKET_NAME as string,
        });

        const list = await client.send(deleteProject);

        if (list.KeyCount) {
          const deleteCommand = new DeleteObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Delete: {
              Objects: list.Contents!.map((item) => ({ Key: item.Key })), // array of keys to be deleted
              Quiet: false, // provides info on successful deletes
            },
          });
          await client.send(deleteCommand);
        }

        await client.send(deleteProject);

        await prisma.project.delete({
          where: { id },
        });
      } catch (e: unknown) {
        console.error(`Failed to delete project with id ${id}:`, e);
        throw new Error(`Project with id ${id} does not exist or couldn't be deleted`);
      }
    })
  );

  return NextResponse.json({ message: "Project Deleted successfully." });
}
