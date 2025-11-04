import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard", "/profile"];

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const payload = await decrypt(session);

  if (protectedRoutes.includes(req.nextUrl.pathname) && !payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
