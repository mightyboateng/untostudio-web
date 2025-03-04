import { NextResponse } from "next/server";
// import { appRoutes } from "./lib/constants";
// import auth from "./lib/auth";

export async function middleware(request: Request) {
  // const user = await auth.getUser()
  const url = new URL(request.url);

  // Skip middleware for root path
  if (url.pathname === "/") {
    return NextResponse.next();
  }

  // Check if the request is already for the login page
  // if (!user && request.url !== new URL(appRoutes.login, request.url).href) {
  //   const response = NextResponse.redirect(
  //     new URL(appRoutes.login, request.url)
  //   );
  //   return response;
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Exclude the root path "/"
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
