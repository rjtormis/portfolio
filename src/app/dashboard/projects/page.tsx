import { getServerSession } from "next-auth";
import Project from "./project";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { fetchAllProjects } from "@/app/actions/project";

export default async function ProjectsPage() {
  const session = await getServerSession(options);
  const projects = await fetchAllProjects();
  return <Project data={projects} userId={session!.user.id} />;
}
