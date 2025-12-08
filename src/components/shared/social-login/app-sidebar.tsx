"use client";

import type { SidebarItem } from "@/lib/sidebar-nav-config";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/mian-logo.png";

export function AppSidebar({ sidebarItems }: { sidebarItems: SidebarItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <Sidebar className="!bg-slate-800 text-white">
      {/* Logo Section */}
      <SidebarHeader className="border-b bg-slate-800 border-sidebar-border">
        <Link href="/" className="flex items-center justify-center py-2">
          <Image
            src={logo}
            alt="Logo"
            width={165}
            height={40}
            className="w-40 h-auto"
          />
        </Link>
      </SidebarHeader>

      {/* Navigation Menu */}
      <SidebarContent className="bg-slate-800 ">
        <SidebarMenu className="">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem className="rounded-none" key={item.href}>
                <SidebarMenuButton
                  className="rounded-none text-xl px-4 py-3"
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Logout Button */}
      <SidebarFooter className="border-t border-sidebar-border bg-slate-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
