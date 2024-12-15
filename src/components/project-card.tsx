"use client";
import Image from "next/image";
import React, { createElement } from "react";

import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "motion/react";
import Link from "next/link";
import { Project } from "@prisma/client";
import { capitalizeFirstLetter, frameworksList } from "@/lib/utils";

function ProjectCard({ data }: { data: Project }) {
  const images = data.images as string[];
  const techstacks = data.techstack as string[];

  return (
    <div className="flex flex-col  p-4">
      <Link href={`/projects/${data.id}`}>
        <motion.div
          className="my-4 hover:cursor-pointer w-full h-[300px] overflow-hidden relative" // Set a fixed height
          whileHover={{ scale: 1.1 }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[0]}`}
            alt="first"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </motion.div>
      </Link>

      <div className="flex justify-center lg:justify-start flex-wrap gap-1">
        {frameworksList.map((f) =>
          techstacks.includes(f.value) ? (
            <Badge className="select-none" key={f.value}>
              <span className="inline-flex items-center">
                {createElement(f.icon)} {/* Dynamically render the icon */}
                <span className="ml-2">{f.label}</span>
              </span>
            </Badge>
          ) : null
        )}
      </div>
      <div className="my-1">
        <Badge className="" variant={data.status === "active" ? "success" : "destructive"}>
          {capitalizeFirstLetter(data.status)}
        </Badge>
      </div>

      <div className="my-1">
        <h1>{data.name}</h1>
        <p className="text-sm">{data.short_description}</p>
      </div>

      <div className="flex justify-center xl:justify-start">
        {" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/rjtormis"
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
                href={data.live}
                className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                target="_blank"
              >
                <ExternalLink size={16} />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="bottom">Live website</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProjectCard;
