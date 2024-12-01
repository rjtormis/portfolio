"use client";
import React from "react";
import ProjectCard from "./project-card";

function ProjectList() {
  return (
    <div className=" text-center lg:text-justify my-24">
      <div className="my-2 text-center">
        <h1 className="text-4xl lg:text-6xl">projects</h1>
        <p className="text-sm text-muted-foreground my-2">
          Projects that I have worked on during my free time.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-lg ">
        <ProjectCard />
      </div>
    </div>
  );
}

export default ProjectList;
