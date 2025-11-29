"use client";

import {
  adminItems,
  applicantItems,
  recruiterItems,
  SidebarItems,
} from "@/lib/sidebar-nav-config";
import { useGetMeQuery } from "@/redux/features/userApi";
import { TopNavbar } from "../recruiter/top-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data } = useGetMeQuery(undefined);

  const role = data?.role;

  // console.log("getMe data:", data);

  let sidebarItems: SidebarItems;

  switch (role) {
    case "admin":
      sidebarItems = adminItems;
      break;
    case "recruiter":
      sidebarItems = recruiterItems;
      break;
    case "applicant":
      sidebarItems = applicantItems;
      break;
    default:
      sidebarItems = [];
  }

  return (
    <SidebarProvider className="bg-slate-800">
      {/* Sidebar */}
      <DashboardSidebar sidebarItems={sidebarItems} />

      <SidebarInset className="bg-[#EBF1FA]">
        <TopNavbar />
        <div className="p-2 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
