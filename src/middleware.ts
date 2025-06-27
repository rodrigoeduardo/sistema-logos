import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if the request is for the manager page
  if (request.nextUrl.pathname.startsWith("/manager")) {
    try {
      const session = await auth();

      // If no session, redirect to home page
      if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      // If auth check fails, redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manager/:path*"],
};
