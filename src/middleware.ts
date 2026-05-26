import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export function middlewareLogic(req: any) {
  const token = req.nextauth.token;
  const path = req.nextUrl.pathname;

  // Protection des routes Administrateurs
  if (path.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.rewrite(new URL("/unauthorized", req.url));
  }

  // Protection des routes Consultants
  if (path.startsWith("/employee") && !["ADMIN", "CONSULTANT"].includes(token?.role as string)) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url));
  }

  // Protection des routes Clients
  if (path.startsWith("/client") && !token) {
       return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export default withAuth(
  middlewareLogic,
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/admin", "/employee/:path*", "/employee", "/client/:path*", "/client"],
};
