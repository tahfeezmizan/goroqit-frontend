"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const logo_png_1 = __importDefault(require("@/assets/logo.png"));
const white_logo_png_1 = __importDefault(require("@/assets/white-logo.png"));
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const utils_1 = require("@/lib/utils");
const userApi_1 = require("@/redux/features/userApi");
const userSlice_1 = require("@/redux/slice/userSlice");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
function Navbar() {
    const { data: user } = (0, userApi_1.useGetMeQuery)(undefined);
    const activeRole = user === null || user === void 0 ? void 0 : user.role;
    console.log("getMe data:", user);
    // State to control mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const pathname = (0, navigation_1.usePathname)();
    // State for scroll position
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // Mock user state - replace with your actual auth logic
    // Navigation links based on user role
    const getNavigationLinks = (userRole) => {
        switch (userRole) {
            case "applicant":
                return [
                    { href: "/", label: "Home" },
                    { href: "/job", label: "Search Job" },
                    { href: "/contact", label: "Contact Us" },
                ];
            case "recruiter":
                return [
                    { href: "/", label: "Home" },
                    { href: "/job", label: "Jobs" },
                    { href: "/find-talent", label: "Find Talent" },
                    { href: "/pricing", label: "Pricing" },
                    { href: "/contact", label: "Contact Us" },
                ];
            default: // guest
                return [
                    { href: "/", label: "Home" },
                    { href: "/find-talent", label: "Find Talent" },
                    { href: "/job", label: "Search Job" },
                    // { href: "/pricing", label: "Pricing" },
                    { href: "/contact", label: "Contact Us" },
                ];
        }
    };
    const navigationLinks = getNavigationLinks(activeRole || "guest");
    const handleLogout = () => {
        (0, userSlice_1.setUser)(null);
        dispatch((0, userSlice_1.removeUser)());
        router.push("/");
        console.log("User logged out");
    };
    // Mock functions for testing - replace with your actual navigation logic
    const handleMessage = () => {
        console.log("Message clicked");
    };
    const handleNotification = () => {
        console.log("Notification clicked");
    };
    return ((0, jsx_runtime_1.jsx)("nav", { className: "text-white relative", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("fixed top-0 w-full z-50 transition-colors duration-400", pathname === "/" && "lg:top-12 left-0", pathname === "/" && isScrolled && "bg-[#EBF1FA] !top-0 border-b", pathname !== "/" && "bg-[#EBF1FA] border-b"), children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2 rounded-md bg-white/10 backdrop-blur-[5px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center h-16", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-2", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: pathname === "/" ? (isScrolled ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: logo_png_1.default, alt: "Logo", width: 165, height: 40, className: "w-40 h-11" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: white_logo_png_1.default, alt: "Logo", width: 165, height: 40, className: "w-40 h-11" }))) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: logo_png_1.default, alt: "Logo", width: 165, height: 40, className: "w-40 h-11" })) }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("hidden lg:flex items-center space-x-3", pathname === "/" ? "text-white" : "text-green-900", pathname === "/" && isScrolled && "text-green-900"), children: navigationLinks.map((link) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: link.href, className: "px-3 font-medium text-xl ", children: link.label }, link.href))) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden lg:flex items-center space-x-4", children: user &&
                                    (activeRole === "applicant" || activeRole === "recruiter") ? (
                                // Authenticated Users (Applicant or Recruiter)
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleMessage, className: (0, utils_1.cn)("p-2 rounded-full hover:bg-white/10 transition-colors", pathname === "/" ? "text-white" : "text-black", pathname === "/" && isScrolled && "text-green-900"), children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { className: "h-6 w-6" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleNotification, className: (0, utils_1.cn)("p-2 rounded-full hover:bg-white/10 transition-colors", pathname === "/" ? "text-white" : "text-black", pathname === "/" && isScrolled && "text-green-900"), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-6 w-6" }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)("button", { className: "flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full bg-green-900 flex items-center justify-center", children: (user === null || user === void 0 ? void 0 : user.image) ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(user === null || user === void 0 ? void 0 : user.image), alt: user === null || user === void 0 ? void 0 : user.name, width: 40, height: 40, className: "w-10 h-10 rounded-full" })) : (
                                                            // <User  />
                                                            (0, jsx_runtime_1.jsx)(lucide_react_1.CircleUserRound, { className: "h-6 w-6 text-white" })) }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", className: "w-48", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-semibold", children: user === null || user === void 0 ? void 0 : user.name }) }), activeRole === "applicant" && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/profile", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Profile" })] }) }) })), activeRole === "recruiter" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Dashboard" })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter/jobs/post-job", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Create Job" })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter/jobs", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Job List" })] }) })] })), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: handleLogout, className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Logout" })] })] })] })] })) : (
                                // Guest Users - Login and Sign Up
                                (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: (0, utils_1.cn)("px-6 py-2 text-base font-medium rounded-lg border-2 cursor-pointer", pathname === "/"
                                                    ? "border-green-900 bg-transparent text-white hover:bg-white hover:border-white hover:text-black"
                                                    : "border-green-900 text-black hover:bg-green-900 hover:text-white", pathname === "/" && isScrolled && "text-green-900 "), children: "Login" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sing-up", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-green-900 hover:bg-green-800 text-white px-6 py-2 text-base font-medium rounded-lg cursor-pointer", children: "Sign Up" }) })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "lg:hidden flex items-center", children: [user &&
                                        (activeRole === "applicant" || activeRole === "recruiter") ? (
                                    // Authenticated Users (Applicant or Recruiter)
                                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleMessage, className: (0, utils_1.cn)("p-2 rounded-full hover:bg-white/10 transition-colors bg-transparent", pathname === "/" ? "text-white" : "text-black", pathname === "/" && isScrolled && "text-green-900"), children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/recruiter/messages", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { className: "h-6 w-6" }) }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleNotification, className: (0, utils_1.cn)("p-2 rounded-full hover:bg-white/10 transition-colors bg-transparent", pathname === "/" ? "text-white" : "text-black", pathname === "/" && isScrolled && "text-green-900"), children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-6 w-6" }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)("button", { className: "flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors", children: (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-green-900 flex items-center justify-center", children: (user === null || user === void 0 ? void 0 : user.image) ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(user === null || user === void 0 ? void 0 : user.image), alt: "Profile", width: 30, height: 30, className: "w-6 h-6 rounded-full" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-6 w-6 text-white" })) }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", className: "w-48", children: [activeRole === "applicant" && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/profile", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Profile" })] }) }) })), activeRole === "recruiter" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Dashboard" })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter/jobs/post-job", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Create Job" })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/recruiter/jobs", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Job List" })] }) })] })), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: handleLogout, className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Logout" })] })] })] })] })) : (
                                    // Guest Users - Login and Sign Up
                                    ""), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "p-2 transition-colors", children: isMobileMenuOpen ? ((0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: `h-8 w-8  ${pathname === "/" ? "text-white" : "text-white"}` })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: `h-8 w-8  !bg-transparent ${pathname === "/" ? "text-white " : ""}` })) })] })] }), isMobileMenuOpen && ((0, jsx_runtime_1.jsx)("div", { className: "lg:hidden border-t border-gray-200 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [navigationLinks.map((link) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: link.href, className: (0, utils_1.cn)("px-3 py-2 text-base font-semibold transition-colors", pathname === "/" ? "text-white" : "text-black", pathname === "/" && isScrolled && "text-green-900"), onClick: () => setIsMobileMenuOpen(false), children: link.label }, link.href))), (0, jsx_runtime_1.jsx)("div", { className: "px-3 pt-4 border-t border-gray-200", children: user &&
                                        (activeRole === "applicant" || activeRole === "recruiter") ? ("") : (
                                    // Mobile - Guest Users
                                    (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", onClick: () => setIsMobileMenuOpen(false), children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: `w-full px-6 py-2 text-base font-medium rounded-lg border-2 ${pathname === "/"
                                                        ? "border-white bg-transparent text-white hover:bg-white hover:text-black"
                                                        : "border-black text-black hover:bg-black hover:text-white"}`, children: "Login" }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-up", onClick: () => setIsMobileMenuOpen(false), children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full bg-green-900 hover:bg-green-800 text-white px-6 py-2 text-base font-medium rounded-lg", children: "Sign Up" }) })] })) })] }) }))] }) }) }));
}
