"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminItems = exports.recruiterItems = exports.applicantItems = void 0;
const lucide_react_1 = require("lucide-react");
// Applicant sidebar items
exports.applicantItems = [
    {
        icon: lucide_react_1.User,
        label: "Profile",
        href: "/profile",
    },
    {
        icon: lucide_react_1.MessageCircle,
        label: "Messages",
        href: "/profile/messages",
    },
    {
        icon: lucide_react_1.FileText,
        label: "Applied Jobs",
        href: "/profile/applied-jobs",
    },
];
// Recruiter sidebar items
exports.recruiterItems = [
    {
        icon: lucide_react_1.LayoutDashboard,
        label: "Overview",
        href: "/recruiter",
    },
    {
        icon: lucide_react_1.LayoutDashboard,
        label: "Company",
        href: "/recruiter/company",
    },
    {
        icon: lucide_react_1.Briefcase,
        label: "Jobs",
        href: "/recruiter/jobs",
    },
    {
        icon: lucide_react_1.MessageCircle,
        label: "Messages",
        href: "/recruiter/messages",
    },
    {
        icon: lucide_react_1.FileText,
        label: "Applications",
        href: "/recruiter/applications",
    },
];
// Admin sidebar items
exports.adminItems = [
    {
        icon: lucide_react_1.LayoutDashboard,
        label: "Dashboard",
        href: "/admin",
    },
    // {
    //     icon: MessageCircle,
    //     label: "Messages",
    //     href: "/admin/messages",
    // },
    {
        icon: lucide_react_1.Building2,
        label: "Recruiter",
        href: "/admin/company",
    },
    {
        icon: lucide_react_1.User,
        label: "Users",
        href: "/admin/users",
    },
    {
        icon: lucide_react_1.Briefcase,
        label: "Jobs Listing ",
        href: "/admin/jobs",
    },
    {
        icon: lucide_react_1.Briefcase,
        label: "Subscription",
        href: "/admin/subscription",
    },
    {
        icon: lucide_react_1.ReceiptText,
        label: "Terms & Conditions",
        href: "/admin/terms-conditions",
    },
    {
        icon: lucide_react_1.Grid2x2Plus,
        label: "Category",
        href: "/admin/category",
    },
];
