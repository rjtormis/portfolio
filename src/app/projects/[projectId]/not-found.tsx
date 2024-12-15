import React from "react";
import error from "@/assets/404.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center text-center m-auto">
      <Image src={error} alt="404" className="mx-auto h-[240px] w-[240px]" />
      <h1 className="text-4xl lg:text-6xl">Oops! Lost in the void.</h1>
      <p className="my-2">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s guide you back home.
      </p>
      <div>
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
