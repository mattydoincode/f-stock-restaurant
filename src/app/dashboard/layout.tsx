"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/info", label: "Restaurant Info" },
  { href: "/dashboard/menu", label: "Menu" },
  { href: "/dashboard/photos", label: "Photos" },
  { href: "/dashboard/theme", label: "Theme" },
  { href: "/dashboard/preview", label: "Preview" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
	const isPreview = pathname === "/dashboard/preview";

	if (isPreview) {
		return (
			<div className="flex flex-1 flex-col">
				{children}
				<Toaster/>
			</div>
		);
	}

  return (
    <div className="flex flex-1">
      <aside className="w-56 shrink-0 border-r bg-muted/40">
        <div className="p-4">
          <Link href="/" className="text-lg font-semibold">
            Goethena
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
	    <Toaster/>
    </div>
  );
}
