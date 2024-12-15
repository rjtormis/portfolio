"use client";
import { ProjectData } from "@/app/actions/project";
import EditProject from "@/components/dialog/edit-project";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you wan

export const columns: ColumnDef<ProjectData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "github",
    header: "Github",
    cell: ({}) => {
      return (
        <div className="flex">
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
        </div>
      );
    },
  },
  {
    accessorKey: "live",
    header: "Live",
    cell: ({}) => {
      return (
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com/rjtormis"
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
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ project, setSelectedProject }) => {
      return <EditProject project={project} setSelectedProject={setSelectedProject} />;
    },
  },
];
