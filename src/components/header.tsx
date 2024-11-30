"use client";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import white from "@/assets/white-logo.png";
import black from "@/assets/black-logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
function Header() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;

  const { theme } = useTheme();
  return (
    <div className="sticky top-0 p-4 bg-background z-50 shadow-md">
      <div className="flex justify-between">
        {theme === "system" && systemTheme === "dark" ? (
          <Image src={white} alt="logo" className="w-[60px] h-[60px] " />
        ) : theme === "system" && systemTheme === "light" ? (
          <Image src={black} alt="logo" className="w-[60px] h-[60px] " />
        ) : theme === "light" ? (
          <Image src={black} alt="logo" className="w-[60px] h-[60px] " />
        ) : (
          <Image src={white} alt="logo" className="w-[60px] h-[60px] " />
        )}
        <div className="my-auto flex">
          {isMobile ? (
            <Sheet>
              <SheetTrigger
                type="button"
                className=" mx-2 my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
              >
                <MdOutlineMenu className="my-auto" size={18} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="flex flex-col">
                    <Link href="/" className="w-full">
                      <Button variant="ghost" className="w-full">
                        About
                      </Button>
                    </Link>
                    <Link href="/" className="w-full">
                      <Button variant="ghost" className="w-full">
                        Projects
                      </Button>
                    </Link>
                    <Link href="/" className="w-full">
                      <Button variant="ghost" className="w-full">
                        Contact
                      </Button>
                    </Link>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Projects</Button>
              <Button variant="ghost" className="mr-2">
                Contact
              </Button>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
