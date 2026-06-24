"use client";

import {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useRestaurant} from "@/hooks/use-restaurant";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button";
import {Check, Circle, FileText, Image, Palette, UtensilsCrossed,} from "lucide-react";

interface ChecklistItem {
	label: string;
	href: string;
	icon: React.ReactNode;
	check: boolean;
	description: string;
}

export default function DashboardPage() {
	const router = useRouter();
	const {restaurant, loading} = useRestaurant();

	useEffect(() => {
		if (!loading && !restaurant) {
			router.replace("/dashboard/onboarding");
		}
	}, [loading, restaurant, router]);

	if (loading || !restaurant) {
		return (
			<div className="flex items-center justify-center py-12 text-muted-foreground">
				Loading...
			</div>
		);
	}

	const hasName = !!restaurant.name;
	const hasHours =
		restaurant?.hours && Object.keys(restaurant.hours).length > 0;
	const hasPhotos =
		!!restaurant?.heroImage || (restaurant?.galleryImages?.length ?? 0) > 0;

	const checklist: ChecklistItem[] = [
		{
			label: "Restaurant Info",
			href: "/dashboard/info",
			icon: <FileText className="h-5 w-5"/>,
			check: !!(hasName && restaurant?.phone),
			description: hasName
				? `${restaurant.name} — ${restaurant.cuisine || "No cuisine set"}`
				: "Add your restaurant name, contact, and hours",
		},
		{
			label: "Menu",
			href: "/dashboard/menu",
			icon: <UtensilsCrossed className="h-5 w-5"/>,
			check: false, // will be checked when menu data is loaded
			description: "Add menu sections and items",
		},
		{
			label: "Photos",
			href: "/dashboard/photos",
			icon: <Image className="h-5 w-5"/>,
			check: hasPhotos,
			description: hasPhotos
				? "Photos uploaded"
				: "Upload hero and gallery images",
		},
		{
			label: "Theme",
			href: "/dashboard/theme",
			icon: <Palette className="h-5 w-5"/>,
			check: !!restaurant?.theme,
			description: restaurant?.theme
				? `Theme: ${restaurant.theme}`
				: "Choose a template and color scheme",
		},
	];

  return (
	  <div className="space-y-6">
		  <div>
			  <h1 className="text-2xl font-bold">
				  {restaurant?.name || "Welcome!"}
			  </h1>
			  <p className="mt-1 text-muted-foreground">
				  {restaurant?.name
					  ? "Manage your restaurant website using the sections below."
					  : "Get started by setting up your restaurant info."}
			  </p>
		  </div>

		  <div className="grid gap-4 sm:grid-cols-2">
			  {checklist.map((item) => (
				  <Link key={item.href} href={item.href} className="block">
					  <Card className="transition-colors hover:border-primary/50">
						  <CardHeader className="flex-row items-center gap-3 space-y-0">
							  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
								  {item.icon}
							  </div>
							  <div className="flex-1">
								  <CardTitle className="flex items-center gap-2 text-base">
									  {item.label}
									  {item.check ? (
										  <Check className="h-4 w-4 text-green-600"/>
									  ) : (
										  <Circle className="h-3 w-3 text-muted-foreground/40"/>
									  )}
								  </CardTitle>
								  <CardDescription className="text-sm">
									  {item.description}
								  </CardDescription>
							  </div>
						  </CardHeader>
					  </Card>
				  </Link>
			  ))}
		  </div>

		  {restaurant?.published && restaurant?.slug && (
			  <Card>
				  <CardContent className="flex items-center justify-between pt-6">
					  <div>
						  <p className="font-medium">Your site is live!</p>
						  <p className="text-sm text-muted-foreground">
							  /s/{restaurant.slug}
						  </p>
					  </div>
					  <Link
						  href={`/s/${restaurant.slug}`}
						  className={buttonVariants({variant: "outline"})}
						  target="_blank"
					  >
						  View Site
					  </Link>
				  </CardContent>
			  </Card>
		  )}
    </div>
  );
}
