"use client";

import mainLogo from "@/assets/mian-logo.png";
import whiteLogo from "@/assets/white-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import { removeUser } from "@/redux/slice/userSlice";
import Cookies from "js-cookie";
import {
  CircleUserRound,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RoqitRewardsButton } from "@/components/shared/RoqitRewardsButton";

// Types for user roles
type UserRole = "guest" | "applicant" | "recruiter" | "admin";

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { data: userData } = useGetMeQuery(undefined);

  // Defer reading cookies/user role until after mount to avoid SSR/CSR mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    setHasToken(!!Cookies.get("token"));
  }, []);

  // ✅ Re-check token when userData changes (for instant update)
  useEffect(() => {
    setHasToken(!!Cookies.get("token"));
  }, [userData]);

  const activeRole: UserRole =
    isMounted && userData?.role ? userData.role : "guest";

  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links based on user role
  const getNavigationLinks = (role: UserRole) => {
    switch (role) {
      case "applicant":
        return [
          { href: "/", label: "Home" },
          { href: "/job", label: "Search Job" },
          { href: "/contact", label: "Contact Us" },
          { href: "/app-download", label: "Get The App" },
        ];
      case "recruiter":
        return [
          { href: "/", label: "Home" },
          { href: "/job", label: "Jobs" },
          { href: "/find-talent", label: "Find Talent" },
          { href: "/pricing", label: "Pricing" },
          { href: "/contact", label: "Contact Us" },
          { href: "/app-download", label: "Get The App" },
        ];
      default: // guest
        return [
          { href: "/", label: "Home" },
          { href: "/find-talent", label: "Find Talent" },
          { href: "/job", label: "Search Job" },
          { href: "/contact", label: "Contact Us" },
          { href: "/app-download", label: "Get The App" },
        ];
    }
  };

  const navigationLinks = getNavigationLinks(activeRole);

  // ✅ Updated logout handler for real-time update
  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    setHasToken(false); // instant UI update
    router.push("/");
  };

  return (
    <nav className="text-white relative">
      <div
        className={cn(
          "fixed top-0 w-full z-50 transition-colors duration-400",
          pathname === "/" && "lg:top-12 left-0",
          pathname === "/" && isScrolled && "bg-[#EBF1FA] !top-0 border-b",
          pathname !== "/" && "bg-[#EBF1FA] border-b"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 rounded-md bg-white/10 backdrop-blur-[5px]">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link href={"/"}>
                {pathname === "/" ? (
                  isScrolled ? (
                    <Image
                      src={mainLogo}
                      alt="Logo"
                      width={165}
                      height={40}
                      className="w-32 sm:w-40 h-auto"
                    />
                  ) : (
                    <Image
                      src={whiteLogo}
                      alt="Logo"
                      width={165}
                      height={40}
                      className="w-32 sm:w-40 h-auto"
                    />
                  )
                ) : (
                  <Image
                    src={mainLogo}
                    alt="Logo"
                    width={165}
                    height={40}
                    className="w-32 sm:w-40 h-auto"
                  />
                )}
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div
              className={cn(
                "hidden lg:flex items-center space-x-1 xl:space-x-3",
                pathname === "/" ? "text-white" : "text-green-900",
                pathname === "/" && isScrolled && "text-green-900"
              )}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 xl:px-3 font-medium text-base xl:text-lg whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 shrink-0">
              {isMounted && hasToken ? (
                <>
                  <RoqitRewardsButton />
                  {activeRole !== "admin" && (
                    <>
                      <Link
                        href={
                          activeRole === "applicant"
                            ? "/profile/messages"
                            : activeRole === "recruiter"
                            ? "/recruiter/messages"
                            : "#"
                        }
                        className={cn(
                          "p-2 rounded-full hover:bg-white/10 transition-colors shrink-0",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-green-900"
                        )}
                      >
                        <MessageCircle className="h-6 w-6" />
                      </Link>
                    </>
                  )}

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors shrink-0">
                        <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center">
                          {userData?.profile?.companyLogo || userData?.image ? (
                            <Image
                              src={getImageUrl(
                                userData?.profile?.companyLogo ||
                                  userData?.image
                              )}
                              alt={userData?.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <CircleUserRound className="size-9 text-white" />
                          )}
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <span className="text-xl font-semibold">
                          {userData?.name}
                        </span>
                      </DropdownMenuItem>

                      {activeRole === "applicant" && (
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                      )}

                      {activeRole === "recruiter" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter/jobs/post-job"
                              className="flex items-center space-x-2"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Create Job</span>
                            </Link>
                          </DropdownMenuItem> */}
                        </>
                      )}

                      {activeRole === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin/jobs"
                              className="flex items-center space-x-2"
                            >
                              <FileText className="h-4 w-4" />
                              <span>All Jobs</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-2 xl:space-x-3 shrink-0">
                  <RoqitRewardsButton />
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "px-4 xl:px-6 py-2 text-sm xl:text-base font-medium rounded-lg border-2 cursor-pointer whitespace-nowrap",
                      pathname === "/"
                        ? "border-green-900 bg-transparent text-white hover:bg-white hover:border-white hover:text-black"
                        : "border-green-900 text-black hover:bg-green-900 hover:text-white",
                      pathname === "/" && isScrolled && "text-green-900 "
                    )}
                  >
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-green-900 hover:bg-green-800 text-white px-4 xl:px-6 py-2 text-sm xl:text-base font-medium rounded-lg cursor-pointer whitespace-nowrap"
                  >
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Header Right Section */}
            <div className="lg:hidden flex items-center space-x-3">
              <RoqitRewardsButton />

              {/* Hamburger Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={cn(
                      "size-8 sm:size-9",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-black"
                    )}
                  />
                ) : (
                  <Menu
                    className={cn(
                      "size-8 sm:size-9",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-black"
                    )}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200/20 py-4 mt-2">
              {/* Logged-in User Profile Header in Mobile Menu */}
              {isMounted && hasToken && (
                <div className="mb-4 pb-3 border-b border-gray-200/20 px-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center overflow-hidden border border-white/20">
                      {userData?.image ? (
                        <Image
                          src={getImageUrl(userData?.image)}
                          alt={userData?.name || "User"}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CircleUserRound className="size-8 text-white" />
                      )}
                    </div>
                    <div>
                      <p
                        className={cn(
                          "font-semibold text-base",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-green-900"
                        )}
                      >
                        {userData?.name}
                      </p>
                      <p className="text-xs opacity-75 capitalize">
                        {activeRole}
                      </p>
                    </div>
                  </div>

                  {activeRole !== "admin" && (
                    <Link
                      href={
                        activeRole === "applicant"
                          ? "/profile/messages"
                          : activeRole === "recruiter"
                          ? "/recruiter/messages"
                          : "#"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "p-2 rounded-full hover:bg-white/10 transition-colors",
                        pathname === "/" ? "text-white" : "text-black",
                        pathname === "/" && isScrolled && "text-green-900"
                      )}
                    >
                      <MessageCircle className="h-6 w-6" />
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-base font-semibold transition-colors rounded-md hover:bg-white/10",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {isMounted && hasToken && (
                  <div className="pt-2 border-t border-gray-200/20 flex flex-col space-y-2">
                    {activeRole === "applicant" && (
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "px-3 py-2 text-base font-semibold flex items-center space-x-2 rounded-md hover:bg-white/10",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-green-900"
                        )}
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                    )}

                    {activeRole === "recruiter" && (
                      <Link
                        href="/recruiter"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "px-3 py-2 text-base font-semibold flex items-center space-x-2 rounded-md hover:bg-white/10",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-green-900"
                        )}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    {activeRole === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "px-3 py-2 text-base font-semibold flex items-center space-x-2 rounded-md hover:bg-white/10",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-green-900"
                        )}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="px-3 py-2 text-base font-semibold text-red-500 flex items-center space-x-2 rounded-md hover:bg-red-500/10 cursor-pointer text-left w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}

                {isMounted && !hasToken && (
                  <div className="flex flex-col space-y-3 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        "px-6 py-2 text-base font-medium rounded-lg border-2 cursor-pointer",
                        pathname === "/"
                          ? "border-green-900 bg-transparent text-white hover:bg-white hover:border-white hover:text-black"
                          : "border-green-900 text-black hover:bg-green-900 hover:text-white",
                        pathname === "/" && isScrolled && "text-green-900 "
                      )}
                    >
                      <Link href="/login">Login</Link>
                    </Button>

                    <Button
                      asChild
                      className="bg-green-900 hover:bg-green-800 text-white px-6 py-2 text-base font-medium rounded-lg cursor-pointer"
                    >
                      <Link href="/sign-up">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
