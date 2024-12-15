import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PartyPopper } from "lucide-react";
import Header from "@/components/header";
import { isMobile } from "@/lib/utils";
import { headers } from "next/headers";
import Container from "@/components/container";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RJ Portfolio",
  description:
    "A personal portfolio showcasing RJ's skills, projects, and experience in software development and application design.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobile = isMobile(userAgent);

  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}  antialiased min-h-screen relative`}>
        <div>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header isMobile={mobile} />

            <Container mobile={mobile}>
              {children}
              <Toaster
                icons={{
                  success: <PartyPopper />,
                }}
              />
            </Container>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
