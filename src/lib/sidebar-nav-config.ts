import { Briefcase, Building2, FileText, Grid2x2Plus, LayoutDashboard, LucideIcon, MessageCircle, ReceiptText, User } from "lucide-react";

// Individual sidebar item
export interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
    priority?: number; // Added priority for serialization
}

// Roles type (optional but useful for role-based logic)
export type DashboardRole = "admin" | "recruiter" | "applicant";

// Sidebar arrays type
export type SidebarItems = SidebarItem[];

// Applicant sidebar items
export const applicantItems: SidebarItems = [
    {
        icon: User,
        label: "Profile",
        href: "/profile",
    },
    {
        icon: MessageCircle,
        label: "Messages",
        href: "/profile/messages",
    },
    {
        icon: FileText,
        label: "Applied Jobs",
        href: "/profile/applied-jobs",
    },
];

// Recruiter sidebar items
export const recruiterItems: SidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/recruiter",
    },
    {
        icon: User,
        label: "Profile",
        href: "/recruiter/profile",
    },
    {
        icon: Building2,
        label: "Company",
        href: "/recruiter/company",
    },
    {
        icon: Briefcase,
        label: "Jobs",
        href: "/recruiter/jobs",
    },
    {
        icon: MessageCircle,
        label: "Messages",
        href: "/recruiter/messages",
    },
    {
        icon: FileText,
        label: "Applications",
        href: "/recruiter/applications",
    },
];

// Admin sidebar items
export const adminItems: SidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/admin",
    },
    // {
    //     icon: MessageCircle,
    //     label: "Messages",
    //     href: "/admin/messages",
    // },
    {
        icon: Building2,
        label: "Recruiter",
        href: "/admin/company",
    },
    {
        icon: User,
        label: "Users",
        href: "/admin/users",
    },
    {
        icon: Briefcase,
        label: "Jobs Listing ",
        href: "/admin/jobs",
    },
    {
        icon: Briefcase,
        label: "Subscription",
        href: "/admin/subscription",
    },
    {
        icon: ReceiptText,
        label: "Terms & Conditions",
        href: "/admin/terms-conditions",
    },
    {
        icon: Grid2x2Plus,
        label: "Category",
        href: "/admin/category",
    },
];
