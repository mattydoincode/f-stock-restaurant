import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Globe, Palette, Smartphone, UtensilsCrossed} from "lucide-react";

const features = [
	{
		icon: <UtensilsCrossed className="h-6 w-6"/>,
		title: "Menu Editor",
		description: "Add sections and items with photos, prices, and dietary tags. Drag to reorder.",
	},
	{
		icon: <Palette className="h-6 w-6"/>,
		title: "Beautiful Templates",
		description: "Choose from three professionally designed themes that make your food shine.",
	},
	{
		icon: <Globe className="h-6 w-6"/>,
		title: "One-Click Publish",
		description: "Preview your site, hit publish, and share a link — your restaurant is online.",
	},
	{
		icon: <Smartphone className="h-6 w-6"/>,
		title: "Mobile Ready",
		description: "Every site looks great on phones, tablets, and desktops — no extra work needed.",
	},
];

const steps = [
	{number: "1", title: "Set Up", description: "Enter your restaurant name, hours, and contact info."},
	{number: "2", title: "Customize", description: "Add your menu, upload photos, and pick a theme."},
	{number: "3", title: "Publish", description: "Preview your site and share it with the world."},
];

export default function Home() {
	return (
		<div className="flex flex-1 flex-col">
			{/* Hero */}
			<section className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
				<h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
					A beautiful website for your restaurant — in minutes
				</h1>
				<p className="max-w-xl text-lg text-muted-foreground">
					Goethena helps restaurant owners create polished, mobile-ready websites
					without design or coding skills. Enter your info, pick a theme, and publish.
				</p>
				<div className="flex gap-3">
					<Link href="/dashboard" className={buttonVariants({size: "lg"})}>
						Get Started Free
					</Link>
					<Link
						href="/s/bella-cucina"
						className={buttonVariants({variant: "outline", size: "lg"})}
					>
						See a Demo
					</Link>
				</div>
			</section>

			{/* Features */}
			<section className="border-t bg-muted/30 px-4 py-20">
				<div className="mx-auto max-w-5xl">
					<h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
						Everything you need, nothing you don&apos;t
					</h2>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{features.map((feature) => (
							<div key={feature.title} className="text-center">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
									{feature.icon}
								</div>
								<h3 className="mb-2 font-semibold">{feature.title}</h3>
								<p className="text-sm text-muted-foreground">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="px-4 py-20">
				<div className="mx-auto max-w-3xl">
					<h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
						Three steps to your restaurant website
					</h2>
					<div className="grid gap-8 sm:grid-cols-3">
						{steps.map((step) => (
							<div key={step.number} className="text-center">
								<div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
									{step.number}
								</div>
								<h3 className="mb-1 font-semibold">{step.title}</h3>
								<p className="text-sm text-muted-foreground">{step.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer CTA */}
			<section className="border-t bg-muted/30 px-4 py-16 text-center">
				<h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
				<p className="mb-6 text-muted-foreground">
					Set up your restaurant website in minutes — no credit card required.
				</p>
				<Link href="/dashboard" className={buttonVariants({size: "lg"})}>
					Build Your Website
				</Link>
			</section>
		</div>
	);
}
