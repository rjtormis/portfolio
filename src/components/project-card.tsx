"use client";
import Image from "next/image";
import React from "react";
import sample from "@/assets/sample.png";

import { Badge } from "./ui/badge";
import { FaGithub } from "react-icons/fa";
import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import { motion } from "motion/react";
import Link from "next/link";

function ProjectCard() {
  return (
    <div className="flex flex-col  p-4 ">
      <motion.div className="my-4 hover:cursor-pointer" whileHover={{ scale: 1.1 }}>
        <Image src={sample} alt="ALT" className="w--full h-full  mx-auto rounded-xl" />
      </motion.div>
      <div className="flex justify-center lg:justify-start gap-2">
        <Badge className="select-none">
          <RiNextjsFill className="mr-2" /> NextJS
        </Badge>
        <Badge>
          <RiReactjsFill className="mr-2" /> ReactJS
        </Badge>
      </div>
      <div className="my-4">
        <h1>My Portfolio</h1>
        <p className="text-sm">My Portfolio built with nextjs</p>
      </div>

      <div className="flex justify-center lg:justify-start">
        <Link href="q">
          <FaGithub />
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
