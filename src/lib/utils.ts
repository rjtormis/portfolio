import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiFlaskFill, RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiMongodb,
  SiMongoose,
  SiPrisma,
  SiPython,
  SiShadcnui,
  SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const frameworksList = [
  { value: "react", label: "ReactJS", icon: RiReactjsFill },
  { value: "nextjs", label: "NextJS", icon: RiNextjsFill },
  { value: "shadcn", label: "ShadCN", icon: SiShadcnui },
  { value: "expressjs", label: "ExpressJS", icon: SiExpress },
  { value: "mongodb", label: "MongoDB", icon: SiMongodb },
  { value: "mongoose", label: "Mongoose", icon: SiMongoose },
  { value: "prisma", label: "Prisma", icon: SiPrisma },
  { value: "flask", label: "Flask", icon: RiFlaskFill },
  { value: "docker", label: "Docker", icon: SiDocker },
  { value: "githubactions", label: "Github Actions", icon: SiGithubactions },
  { value: "tailwindcss", label: "TailwindCSS", icon: RiTailwindCssFill },
  { value: "aws", label: "AWS", icon: FaAws },
  { value: "typescript", label: "TypeScript", icon: SiTypescript },
  { value: "python", label: "Python", icon: SiPython },
];

export function getFileExtension(mimeType: string): string {
  const mimeTypeMap: { [key: string]: string } = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    // Add other MIME types and extensions as needed
  };

  return mimeTypeMap[mimeType] || ""; // Default to an empty string if type is unknown
}

export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

interface FrameworkItem {
  value: string;
  label: string;
  icon: IconType;
}

export function divideArray(list: FrameworkItem[]) {
  const partSize = Math.floor(list.length / 3);
  const remainder = list.length % 3;
  const part1 = list.slice(0, partSize + (remainder > 0 ? 1 : 0));
  const part2 = list.slice(
    partSize + (remainder > 0 ? 1 : 0),
    2 * partSize + (remainder > 1 ? 1 : 0)
  );
  const part3 = list.slice(2 * partSize + (remainder > 1 ? 1 : 0));

  return [part1, part2, part3];
}
