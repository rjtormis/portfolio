import Footer from "@/components/footer";
import Contact from "@/components/contact";
import ProjectList from "@/components/project";
import Hero from "@/components/hero";
import About from "@/components/about";
import Header from "@/components/header";
// import HeaderWrapper from "@/components/header-wrapper";
import { headers } from "next/headers";
import { isMobile } from "@/lib/utils";

export default async function Home() {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobile = isMobile(userAgent);
  return (
    <div className="min-h-screen">
      {/* <HeaderWrapper /> */}
      <Header isMobile={mobile} />

      <div className="flex flex-col px-20">
        <Hero />
        <About />

        <ProjectList />

        <Contact />
      </div>
      <Footer />
    </div>
  );
}
