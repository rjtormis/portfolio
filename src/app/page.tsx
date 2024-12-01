import Header from "@/components/header";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import ProjectList from "@/components/project";
import Hero from "@/components/hero";
import About from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
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
