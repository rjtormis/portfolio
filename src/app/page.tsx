import Footer from "@/components/footer";
import Contact from "@/components/contact";
import ProjectList from "@/components/project";
import Hero from "@/components/hero";
import About from "@/components/about";
import Techstack from "@/components/tech";
import { fetchAllProjectsLanding } from "./actions/project";

export default async function Home() {
  const projects = await fetchAllProjectsLanding();
  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <Hero />
        <About />
        <Techstack />
        <ProjectList data={projects} />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
