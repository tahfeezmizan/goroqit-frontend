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

  let role: string | undefined;

  // 🔹 Decode token and extract role
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      role = decoded.role;
    } catch (error) {
      console.error("❌ Invalid token:", error);
    }
  } else {
    console.log("⚠️ No token found in cookies");
  }

  // 🔹 Define route categories
  const roleBasedRoutes = {
    applicant: ["/profile"],
    recruiter: ["/recruiter"],
    admin: ["/admin"],
  };

  const allProtectedRoutes = [
    ...roleBasedRoutes.applicant,
    ...roleBasedRoutes.recruiter,
    ...roleBasedRoutes.admin,
  ];

  // Check if the path is protected
  const isProtected = allProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 🔹 If no token and route is protected → redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 s
  return NextResponse.next();
}

export const config = {
  matcher: ["/recruiter/:path*", "/admin/:path*", "/profile/:path*"],
};

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
//   let isTokenValid = false;

//   // 🔹 Decode token and extract role
//   if (token) {
//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       role = decoded.role;

//       // Check if token is expired
//       if (decoded.exp && decoded.exp * 1000 > Date.now()) {
//         isTokenValid = true;
//       } else {
//         console.log("⚠️ Token expired");
//       }
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

//   // 🔹 Routes that require authentication (any role)
//   const authRequiredRoutes = [
//     "/job/", // Job details pages
//     "/applications",
//     "/messages",
//     "/saved-jobs",
//     ...roleBasedRoutes.applicant,
//     ...roleBasedRoutes.recruiter,
//     ...roleBasedRoutes.admin,
//   ];

//   // Check if the path requires authentication
//   const requiresAuth = authRequiredRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // 🔹 If no valid token and route requires auth → redirect to login
//   if (requiresAuth && (!token || !isTokenValid)) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // 🔹 Role-based access control
//   if (isTokenValid && role) {
//     // Prevent applicants from accessing recruiter/admin routes
//     if (
//       role === "applicant" &&
//       (pathname.startsWith("/recruiter") || pathname.startsWith("/admin"))
//     ) {
//       return NextResponse.redirect(new URL("/profile", req.url));
//     }

//     // Prevent recruiters from accessing admin routes
//     if (role === "recruiter" && pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/recruiter", req.url));
//     }
//   }

//   // 🔹 Add token to response headers for API routes (optional but helpful)
//   const response = NextResponse.next();
//   if (token) {
//     response.headers.set("x-user-role", role || "");
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/recruiter/:path*",
//     "/admin/:path*",
//     "/profile/:path*",
//     // "/job/:path*", // ✅ ADDED: Protect job details pages
//     "/applications/:path*",
//     "/messages/:path*",
//     "/saved-jobs/:path*",
//   ],
// };
