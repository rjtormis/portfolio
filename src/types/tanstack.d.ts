import { ProjectData } from "@/app/actions/project";
import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { Dispatch, SetStateAction } from "react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface CellContext {
    project: TData;
    setSelectedProject: Dispatch<SetStateAction<ProjectData | null>>;
  }
}
