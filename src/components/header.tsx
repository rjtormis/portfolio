"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
// import white from "@/assets/white-logo.png";
// import black from "@/assets/black-logo.png";
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
import { usePathname } from "next/navigation";

function Header({ isMobile }: { isMobile: boolean }) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof resolvedTheme === "string") {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  if (!pathname.includes("/dashboard") && pathname !== "/login")
    return (
      <div className="sticky top-0 p-4 bg-background z-50 shadow-md">
        <div className="flex justify-between">
          {/* <Link href="/">
            {theme === "dark" ? (adasd
              <Image src={white} alt="logo" className="w-[60px] h-[60px] " />
            ) : (
              <Image src={black} alt="logo" className="w-[60px] h-[60px] " />
            )}
          </Link> */}

          <div className="my-auto flex">
            {isMobile ? (
              <Sheet>
                <SheetTrigger
                  type="button"
                  className="mx-2 my-auto hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                >
                  <MdOutlineMenu className="my-auto" size={18} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription className="flex flex-col">
                      <Link href="#about" className="w-full">
                        <Button variant="ghost" className="w-full">
                          About
                        </Button>
                      </Link>
                      <Link href="#projects" className="w-full">
                        <Button variant="ghost" className="w-full">
                          Projects
                        </Button>
                      </Link>
                      <Link href="#techstacks" className="w-full">
                        <Button variant="ghost" className="w-full">
                          Techstacks
                        </Button>
                      </Link>
                      <Link href="#contact" className="w-full">
                        <Button variant="ghost" className="w-full">
                          Contact
                        </Button>
                      </Link>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex">
                <Link href="#about" className="w-full">
                  <Button variant="ghost" className="w-full">
                    About
                  </Button>
                </Link>
                <Link href="#techstacks" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Techstacks
                  </Button>
                </Link>
                <Link href="#projects" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Projects
                  </Button>
                </Link>
                <Link href="#contact" className="w-full mr-2">
                  <Button variant="ghost" className="w-full">
                    Contact
                  </Button>
                </Link>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
}

export default Header;
