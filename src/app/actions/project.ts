"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  techstack: string[];
  createdById: string;
  createdDate: string;
  updatedAt: string;
  github: string;
  live: string;
  images: string[];
  short_description: string;
}

export const fetchAllProjects = async (): Promise<ProjectData[]> => {
  const response = await fetch(`${process.env.URL}/api/dashboard/projects`, {
    method: "GET",
    headers: await headers(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project data");
  }

  const data: ProjectData[] = await response.json();

  return data;
};

export const fetchAllProjectsLanding = async () => {
  const projects = await prisma.project.findMany({});
  return projects;
};

export const fetchSpecificProject = async (id: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id,
    },
  });
  return project;
};
