"use client";
import React from "react";
import Items from "@/components/items";
import { divideArray, frameworksList } from "@/lib/utils";

function Techstack() {
  const [first, second, third] = divideArray(frameworksList);

  return (
    <div
      id="techstacks"
      className="scroll-mt-32 flex flex-col gap-2 text-center justify-center my-10 relative"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl lg:text-6xl">techstack & tools</h1>
        <p className="text-sm text-muted-foreground">
          Here are some of the technologies and tools I work with.
        </p>
      </div>
      <div className=" gap-4 my-8">
        <div className="flex flex-col justify-center gap-10 my-4 ">
          <div className="flex gap-7 justify-center">
            {first.map((f) => (
              <Items key={f.label} name={f.label} icon={f.icon} />
            ))}
          </div>
          <div className="flex gap-7 justify-center">
            {third.map((f) => (
              <Items key={f.label} name={f.label} icon={f.icon} />
            ))}
          </div>
          <div className="flex gap-7 justify-center">
            {second.map((f) => (
              <Items key={f.label} name={f.label} icon={f.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Techstack;
