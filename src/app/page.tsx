"use client";
import { motion } from "motion/react";
import code from "@/assets/code.json";
import laptop from "@/assets/laptop.json";
import codealt from "@/assets/landing-alt.json";
import Lottie from "lottie-react";
import Items from "@/components/items";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { tools } from "./utilities/utils";
import Contact from "@/components/contact";
import ProjectList from "@/components/project";
import { toast } from "sonner";
export default function Home() {
  const { theme } = useTheme();

  const handleDownloadResume = () => {
    toast.success("Success!", {
      description: "Resume downloaded.",
    });
  };

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
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button size="lg" className="rounded-full">
                      About
                    </Button>
                  </motion.div>

                  <a href="/RJT_CV_2024.pdf" download="RJT_CV_2024" onClick={handleDownloadResume}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button variant="altghost" size="lg" className="rounded-full">
                        Download Resume
                      </Button>
                    </motion.div>
                  </a>
                </div>

                <div className="my-2 flex gap-2 justify-center xl:justify-start">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href="https://github.com/rjtormis"
                          className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                          target="_blank"
                        >
                          <Github size={24} />
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Github</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href="https://www.linkedin.com/in/ranel-john-tormis-2b83a9200/"
                          className="my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                          target="_blank"
                        >
                          <Linkedin size={24} />
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Linkedin</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {theme === "light" ? (
                  <Lottie animationData={code} loop={true} />
                ) : (
                  <Lottie animationData={codealt} loop={true} />
                )}
              </motion.div>
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

        <ProjectList />

        <Contact />
      </div>
      <Footer />
    </div>
  );
}
