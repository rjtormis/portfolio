"use client";

import laptop from "@/assets/laptop.json";
import Lottie from "lottie-react";
import React from "react";

function About() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
      <div className="">
        <Lottie animationData={laptop} loop={true} className="lg:w-[600px] lg:h-[600px] m-auto" />
      </div>

      <div className="text-center ">
        <div className="my-2 lg:text-right">
          <h1 className="text-4xl lg:text-6xl">about</h1>
          <p className="text-sm text-muted-foreground">A short introduction.</p>
        </div>
        <div className="flex flex-col gap-3 text-lg text-justify ">
          <p>
            Hi! I am Ranel John, a passionate, enthusiastic and driven full-stack developer with a
            knack in figuring things out (thats what we usually do, don&apos;t we? Pun intended)
          </p>
          <p>
            I have been coding professionally for over a year, implementing features, solving bugs,
            automating tasks, and much more. My tech stack includes technologies like TypeScript,
            Git, MERN, TailwindCSS, and many others. Each project I tackle challenges me to grow and
            refine my skills, which I absolutely love!
          </p>
          <p>
            As a developer, I firmly believe that we play a vital role in bridging the worlds of
            technology and life. As a human, I believe that whatever happens to us should be seen as
            an experience to learn from, always encouraging us to move forward.
          </p>{" "}
          <p>
            When I’m not busy coding or working on side projects, you’ll often find me reading books
            and articles across different genres—whether it’s news, technology, or something
            entirely unexpected. Outside of that, I enjoy hitting the gym to stay active and
            maintain a healthy balance in life.
          </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default About;
