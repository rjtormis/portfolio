"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import code from "@/assets/code.json";
import codealt from "@/assets/landing-alt.json";
import { Github, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import Lottie from "lottie-react";

function Hero() {
  const { theme } = useTheme();
  const handleDownloadResume = () => {
    toast.success("Success!", {
      description: "Resume downloaded.",
    });
  };
  return (
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
  );
}

export default Hero;
