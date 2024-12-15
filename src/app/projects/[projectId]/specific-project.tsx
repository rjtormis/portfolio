"use client";
import Image from "next/image";
import React, { createElement } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "motion/react";
import Link from "next/link";
import { Project } from "@prisma/client";

import ReactMarkdown from "react-markdown";
import { capitalizeFirstLetter, frameworksList } from "@/lib/utils";

function SpecificProject({ data }: { data: Project }) {
  const images = data.images as string[];
  const techstacks = data.techstack as string[];
  return (
    <>
      <div className="flex gap-4 justify-center xl:justify-start">
        <Link className="my-auto" href="/">
          <ArrowLeft className="my-auto" />
        </Link>
        <h1 className="text-4xl lg:text-6xl">{data.name}</h1>
      </div>

      <section className="my-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[0]}`}
            alt="first"
            width={0} // Use 0 for responsive image sizing
            height={0} // Use 0 for responsive image sizing
            sizes="(max-width: 768px) 100vw, 50vw" // Adjust size based on screen size
            className="rounded-tl-xl rounded-bl-xl object-cover w-full h-full"
          />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[1]}`}
              alt="second"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[2]}`}
              alt="third"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full rounded-tr-xl"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[3]}`}
              alt="fourth"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className=" object-cover w-full h-full"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[4]}`}
              alt="fifth"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-br-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="my-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-center xl:justify-start">
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
          <div className="my-2">
            <span className="text-sm m-auto">
              Status:
              <Badge
                className="ml-2"
                variant={data.status === "active" ? "success" : "destructive"}
              >
                {capitalizeFirstLetter(data.status)}
              </Badge>
            </span>
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

        <div className="my-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-center xl:text-left font-bold">Description</h3>
            <ReactMarkdown>{data.description}</ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
}

export default SpecificProject;
