import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getRestaurantBySlug} from "@/services/restaurant.service";
import {getFullMenu} from "@/services/menu.service";
import {getColorSchemeVars} from "@/lib/site-utils";
import {getTemplate} from "@/components/site/templates/registry";
import {NotFoundError} from "@/lib/errors";

interface PublishedSitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	                                       params,
                                       }: PublishedSitePageProps): Promise<Metadata> {
	const {slug} = await params;
	try {
		const restaurant = await getRestaurantBySlug(slug);
		return {
			title: `${restaurant.name} — ${restaurant.cuisine || "Restaurant"}`,
			description: restaurant.description || `Welcome to ${restaurant.name}`,
		};
	}
	catch {
		return {title: "Restaurant Not Found"};
	}
}

export default async function PublishedSitePage({
	                                                params,
                                                }: PublishedSitePageProps) {
  const { slug } = await params;

	let restaurant;
	try {
		restaurant = await getRestaurantBySlug(slug);
	}
	catch (err) {
		if (err instanceof NotFoundError) notFound();
		throw err;
	}

	const menu = await getFullMenu(restaurant.id);
	const colorVars = getColorSchemeVars(restaurant.colorScheme);
	const Template = getTemplate(restaurant.theme);

	return <Template restaurant={restaurant} menu={menu} colorVars={colorVars}/>;
}
