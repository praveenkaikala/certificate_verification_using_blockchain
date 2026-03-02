"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  Upload,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import LogoutButton from "@/utils/logout";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Institutes",
    href: "/admin/institutes/",
    icon: Upload,
  },
  // {
  //   label: "Users",
  //   href: "/admin/users",
  //   icon: FileCheck2,
  // },
  // {
  //   label: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 border-r bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-bold tracking-tight">Institute Panel</h2>
        <p className="text-sm text-muted-foreground">ForgeryShield</p>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t px-3 py-4">
       <LogoutButton/>
      </div>
    </aside>
  );
};

export default AdminSidebar;
