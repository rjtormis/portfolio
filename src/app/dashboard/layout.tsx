import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import Providers from "@/components/providers";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/login");
  }
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">
          <div className=" h-screen mx-20  flex flex-col ">
            <SidebarTrigger className="absolute left-2" />
            <div className="absolute right-2">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </Providers>
  );
}
