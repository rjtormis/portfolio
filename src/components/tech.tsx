"use client";
import React from "react";
import Items from "@/components/items";
import { tools } from "@/app/utilities/utils";

function Techstack() {
  return (
    <div className="flex flex-col gap-2 text-center justify-center my-10 relative">
      <div className="flex flex-col">
        <h1 className="text-4xl lg:text-6xl">techstack & tools</h1>
        <p className="text-sm text-muted-foreground">
          Here are some of the technologies and tools I work with.
        </p>
      </div>
      <div className=" gap-4 my-8">
        <div className="flex justify-center gap-10 my-4 ">
          {tools
            .filter((t) => t.type === "frontend")
            .map((t) => (
              <Items key={t.name} name={t.name} icon={t.design} />
            ))}
        </div>
        <div className="flex justify-center gap-10 my-4 ">
          {tools
            .filter((t) => t.type === "tools")
            .map((t) => (
              <Items key={t.name} name={t.name} icon={t.design} />
            ))}
        </div>
        <div className="flex justify-center gap-10 my-4">
          {tools
            .filter((t) => t.type === "backend")
            .map((t) => (
              <Items key={t.name} name={t.name} icon={t.design} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Techstack;
