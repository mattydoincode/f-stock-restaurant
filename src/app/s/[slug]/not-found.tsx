import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function SiteNotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="text-4xl font-bold">Not Found</h1>
			<p className="mt-4 text-lg text-muted-foreground">
				This restaurant site is not available.
			</p>
			<Link href="/" className={buttonVariants({variant: "outline", className: "mt-6"})}>
				Go Home
			</Link>
		</div>
	);
}
