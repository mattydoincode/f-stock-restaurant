export const dynamic = 'force-dynamic';

import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle} from "lucide-react";
import {getRestaurant} from "@/services/restaurant.service";
import {getFullMenu} from "@/services/menu.service";
import {getColorSchemeVars} from "@/lib/site-utils";
import {getTemplate} from "@/components/site/templates/registry";
import {PreviewToolbar} from "@/components/dashboard/preview-toolbar";
import {NotFoundError} from "@/lib/errors";

export default async function PreviewPage() {
	let restaurant;
	try {
		restaurant = await getRestaurant();
	}
	catch (err) {
		if (err instanceof NotFoundError) {
			return (
				<div className="flex flex-1 items-center justify-center p-6">
					<Card className="max-w-md">
						<CardHeader className="items-center text-center">
							<AlertCircle className="mb-2 h-12 w-12 text-muted-foreground/40"/>
							<CardTitle>No Restaurant Yet</CardTitle>
							<CardDescription>
								Create your restaurant first by filling in the basic info.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-center">
							<Link
								href="/dashboard/info"
								className={buttonVariants({variant: "default"})}
							>
								Set Up Restaurant
							</Link>
						</CardContent>
					</Card>
				</div>
			);
		}
		throw err;
	}

	const menu = await getFullMenu(restaurant.id);
	const colorVars = getColorSchemeVars(restaurant.colorScheme);
	const Template = getTemplate(restaurant.theme);

	return (
		<div className="flex flex-1 flex-col">
			<PreviewToolbar slug={restaurant.slug} initialPublished={restaurant.published}/>
			<div className="flex-1">
				<Template restaurant={restaurant} menu={menu} colorVars={colorVars}/>
			</div>
		</div>
	);
}
