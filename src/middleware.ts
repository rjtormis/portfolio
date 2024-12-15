import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  const cookie = await cookies();
  const initialVisit = cookie.get("initialVisit")?.value;
  const today = new Date().toISOString().slice(0, 10);

  // Metrics usage
  if (!initialVisit || initialVisit !== today) {
    const data = await fetch(`${process.env.URL}/api/dashboard/metrics`, {
      method: "GET",
      headers: await headers(),
    });
    if (data.ok) {
      const test = await data.json();
      if (test.message !== "No user registered") {
        cookie.set("initialVisit", today);
      }
    }
  }

  return NextResponse.next(); // Allow all other requests
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/dashboard/:path*",
  ],
};
