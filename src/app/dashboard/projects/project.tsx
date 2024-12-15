"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import NewProjectDialog from "@/components/dialog/new-project";
import DeleteProject from "@/components/dialog/delete-project";
import { createElement, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import { ProjectData } from "@/app/actions/project";
import { frameworksList } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

interface ProjectContainerProps {
  data: ProjectData[];
  userId: string;
}

function Project({ data, userId }: ProjectContainerProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [deleteProjects, setDeleteProjects] = useState<string[]>([]);
  const [searchProject, setSearchProject] = useState<string>("");

  useEffect(() => {
    if (searchProject !== "") {
      setProjects(data.filter((d) => d.name.toLowerCase().includes(searchProject.toLowerCase())));
    } else {
      setProjects(data);
    }
  }, [data, searchProject]);
  return (
    <div className="">
      <div>
        <h2 className=" font-bold text-3xl">Projects</h2>{" "}
        <span className="text-muted-foreground text-xs">List of projects.</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <div className="my-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Search project"
                onChange={(e) => setSearchProject(e.target.value)}
              />
            </div>
            <div className="flex gap-1 ml-auto">
              <NewProjectDialog userId={userId} />
              <DeleteProject ids={deleteProjects} setSelectedProject={setSelectedProject} />
            </div>
          </div>
          <DataTable
            data={projects}
            columns={columns}
            setSelectedProject={setSelectedProject}
            setDeleteProjects={setDeleteProjects}
          />
        </div>
        {selectedProject !== null ? (
          <div className=" p-4 ">
            <Button
              className="absolute right-10"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProject(null)}
            >
              <X />
            </Button>
            <div className="grid grid-cols-3 gap-3 ">
              {selectedProject.images.length >= 1
                ? selectedProject.images.map((i) => (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_AWS_LINK as string}/${i}`}
                      key={i}
                      alt={i}
                      width={120}
                      height={120}
                    />
                  ))
                : null}
            </div>

            <div className="mt-4">
              <h3 className="text-2xl">{selectedProject.name}</h3>

              <div className="flex flex-col gap-2 mt-4">
                <h2 className=" font-bold">Description</h2>
                <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h2 className=" font-bold">Techstack</h2>
                <div className="flex flex-wrap gap-2">
                  {frameworksList.map((f) =>
                    selectedProject.techstack.includes(f.value) ? (
                      <Badge className="select-none" key={f.value}>
                        <span className="inline-flex items-center">
                          {createElement(f.icon)} {/* Dynamically render the icon */}
                          <span className="ml-2">{f.label}</span>
                        </span>
                      </Badge>
                    ) : null
                  )}
                </div>
              </div>
              <div className="flex my-4 gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={selectedProject.github}
                        className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                        target="_blank"
                      >
                        <Github size={16} />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Github</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={selectedProject.live}
                        className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                        target="_blank"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Live</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Project;
