// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// type TokenPayload = {
//   role?: string;
//   name?: string;
//   authId?: string;
//   exp?: number;
// };

// export function middleware(req: NextRequest) {
//   const token =
//     req.cookies.get("token")?.value || req.cookies.get("user")?.value;
//   const pathname = req.nextUrl.pathname;

//   let role: string | undefined;

//   // 🔹 Decode token and extract role
//   if (token) {
//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       role = decoded.role;
//     } catch (error) {
//       console.error("❌ Invalid token:", error);
//     }
//   } else {
//     console.log("⚠️ No token found in cookies");
//   }

//   // 🔹 Define route categories
//   const roleBasedRoutes = {
//     applicant: ["/profile"],
//     recruiter: ["/recruiter"],
//     admin: ["/admin"],
//   };

//   const allProtectedRoutes = [
//     ...roleBasedRoutes.applicant,
//     ...roleBasedRoutes.recruiter,
//     ...roleBasedRoutes.admin,
//   ];

//   // Check if the path is protected
//   const isProtected = allProtectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // 🔹 If no token and route is protected → redirect to login
//   if (isProtected && !token) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // 🔹 s
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/recruiter/:path*", "/admin/:path*", "/profile/:path*"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  role?: string;
  name?: string;
  authId?: string;
  exp?: number;
};

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value || req.cookies.get("user")?.value;

  const pathname = req.nextUrl.pathname;

  let role: string | undefined = undefined;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      role = decoded.role;
    } catch (error) {
      console.error("❌ Invalid token:", error);
    }
  }

  // Protected routes
  const protectedRoutes = ["/profile", "/recruiter", "/admin"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/recruiter/:path*", "/admin/:path*"],
};
