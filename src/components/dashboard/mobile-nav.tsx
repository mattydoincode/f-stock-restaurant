"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const navItems = [
	{href: "/dashboard", label: "Overview"},
	{href: "/dashboard/info", label: "Restaurant Info"},
	{href: "/dashboard/menu", label: "Menu"},
	{href: "/dashboard/photos", label: "Photos"},
	{href: "/dashboard/theme", label: "Theme"},
	{href: "/dashboard/preview", label: "Preview"},
];

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			<div className="flex items-center justify-between border-b p-3 md:hidden">
				<Link href="/" className="text-lg font-semibold" onClick={() => setOpen(false)}>
					Goethena
				</Link>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setOpen(!open)}
					aria-label={open ? "Close menu" : "Open menu"}
				>
					{open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
				</Button>
			</div>

			{open && (
				<div className="fixed inset-0 top-[57px] z-40 bg-background md:hidden">
					<nav className="flex flex-col gap-1 p-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className={cn(
									"rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
									pathname === item.href
										? "bg-accent text-accent-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</>
	);
}
