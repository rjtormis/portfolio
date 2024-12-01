"use client";
import Header from "@/components/header";
import code from "@/assets/code.json";
import laptop from "@/assets/laptop.json";
import codealt from "@/assets/landing-alt.json";
import Lottie from "lottie-react";
import Items from "@/components/items";
import Link from "next/link";
import contact from "@/assets/contact.json";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import ProjectCard from "@/components/project-card";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
export default function Home() {
  const { theme } = useTheme();
  const tools = [
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
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col px-20">
        <div className="h-screen flex flex-col">
          <div className="flex-grow flex  flex-col justify-center ">
            <div className="grid grid-cols-1  xl:grid-cols-2">
              <div className="flex flex-col text-center xl:text-left justify-center">
                <div className="my-2">
                  <p className="text-4xl lg:text-6xl">Hi, I&apos;m Ranel John</p>
                  <span className="text-md text-muted-foreground">
                    Enthusiastic and driven person who loves to develop real world applications.
                  </span>
                </div>
                <div className="flex gap-2 justify-center xl:justify-start">
                  <Button size="lg" className="rounded-full">
                    About
                  </Button>
                  <Button size="lg" className="rounded-full">
                    Download Resume
                  </Button>
                </div>

                <div className="my-2 flex gap-2 justify-center xl:justify-start">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="test"
                          className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                        >
                          <Github size={24} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Github</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="test"
                          className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                        >
                          <Linkedin size={24} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Linkedin</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex justify-center">
                {theme === "light" ? (
                  <Lottie animationData={code} loop={true} />
                ) : (
                  <Lottie animationData={codealt} loop={true} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          <div className="">
            <Lottie
              animationData={laptop}
              loop={true}
              className="lg:w-[600px] lg:h-[600px] m-auto"
            />
          </div>

          <div className="text-center ">
            <div className="my-2 lg:text-right">
              <h1 className="text-4xl lg:text-6xl">about</h1>
              <p className="text-sm text-muted-foreground">A short introduction.</p>
            </div>
            <div className="flex flex-col gap-3 text-lg text-justify ">
              <p>
                Hi! I am Ranel John, a passionate, enthusiastic and driven full-stack developer with
                a knack in figuring things out (thats what we usually do, don&apos;t we? Pun
                intended)
              </p>
              <p>
                I have been coding professionally for over a year, implementing features, solving
                bugs, automating tasks, and much more. My tech stack includes technologies like
                TypeScript, Git, MERN, TailwindCSS, and many others. Each project I tackle
                challenges me to grow and refine my skills, which I absolutely love!
              </p>
              <p>
                As a developer, I firmly believe that we play a vital role in bridging the worlds of
                technology and life. As a human, I believe that whatever happens to us should be
                seen as an experience to learn from, always encouraging us to move forward.
              </p>{" "}
              <p>
                When I’m not busy coding or working on side projects, you’ll often find me reading
                books and articles across different genres—whether it’s news, technology, or
                something entirely unexpected. Outside of that, I enjoy hitting the gym to stay
                active and maintain a healthy balance in life.
              </p>{" "}
            </div>
          </div>
        </div>

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
                  <Items key={t.name} name={t.name} design={t.design} />
                ))}
            </div>
            <div className="flex justify-center gap-10 my-4 ">
              {tools
                .filter((t) => t.type === "tools")
                .map((t) => (
                  <Items key={t.name} name={t.name} design={t.design} />
                ))}
            </div>
            <div className="flex justify-center gap-10 my-4">
              {tools
                .filter((t) => t.type === "backend")
                .map((t) => (
                  <Items key={t.name} name={t.name} design={t.design} />
                ))}
            </div>
          </div>
        </div>

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

        <div className=" lg:text-justify my-10">
          <div className="my-2">
            <h1 className="text-4xl text-center lg:text-left lg:text-6xl">let&apos;s connect</h1>
            <p className="text-sm text-center lg:text-left text-muted-foreground my-2">
              Let&apos;s connect! If you have something in mind, feel free to share your thoughts.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-lg ">
            <div className="flex flex-col ">
              <section>
                <Label htmlFor="name">Email</Label>
                <Input name="name" placeholder="Your name" className="my-2" />
              </section>
              <section>
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="Your email" className="my-2" />
              </section>
              <section>
                <Label htmlFor="message">Message</Label>
                <Textarea name="message" placeholder="Your message" className="my-2" />
              </section>
              <div className="my-4 flex justify-center lg:justify-end">
                <Button>Send me a message</Button>
              </div>
            </div>
            <Lottie animationData={contact} loop={true} className=" m-auto" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
