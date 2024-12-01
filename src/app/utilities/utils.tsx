"use client";
import { RiReactjsFill, RiNextjsFill } from "react-icons/ri";
import {
  SiExpress,
  SiDocker,
  SiGithub,
  SiGithubactions,
  SiFlask,
  SiTailwindcss,
  SiShadcnui,
} from "react-icons/si";

export const tools = [
  {
    type: "frontend",
    name: "ReactJS",
    design: <RiReactjsFill size={24} />,
  },
  {
    type: "frontend",
    name: "TailwindCSS",
    design: <SiTailwindcss size={24} />,
  },
  {
    type: "frontend",
    name: "ShadcnUI",
    design: <SiShadcnui size={24} />,
  },

  {
    type: "backend",
    name: "ExpressJS",
    design: <SiExpress size={24} />,
  },
  {
    type: "backend",
    name: "Flask",
    design: <SiFlask size={24} />,
  },
  {
    type: "backend",
    name: "NextJS",
    design: <RiNextjsFill size={24} />,
  },
  {
    type: "tools",
    name: "Github",
    design: <SiGithub size={24} />,
  },
  {
    type: "tools",
    name: "Github actions",
    design: <SiGithubactions size={24} />,
  },
  {
    type: "tools",
    name: "Docker",
    design: <SiDocker size={24} />,
  },
];
