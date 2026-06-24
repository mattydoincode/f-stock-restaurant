import type {Metadata} from "next";
import {headers} from "next/headers";
import {notFound} from "next/navigation";
import {getRestaurantBySlug} from "@/services/restaurant.service";
import {getFullMenu} from "@/services/menu.service";
import {getColorSchemeVars} from "@/lib/site-utils";
import {getTemplate} from "@/components/site/templates/registry";
import {buildRestaurantJsonLd} from "@/lib/structured-data";
import {NotFoundError} from "@/lib/errors";

interface PublishedSitePageProps {
	params: Promise<{ slug: string }>;
}

function getSiteUrl(headersList: Awaited<ReturnType<typeof headers>>): string {
	const host = headersList.get("host") ?? "localhost:3000";
	const proto = headersList.get("x-forwarded-proto") ?? "http";
	return `${proto}://${host}`;
}

export async function generateMetadata({
	                                       params,
                                       }: PublishedSitePageProps): Promise<Metadata> {
	const {slug} = await params;
	try {
		const restaurant = await getRestaurantBySlug(slug);
		const headersList = await headers();
		const siteUrl = getSiteUrl(headersList);
		const pageUrl = `${siteUrl}/s/${slug}`;
		const title = `${restaurant.name} — ${restaurant.cuisine || "Restaurant"}`;
		const description = restaurant.description || `Welcome to ${restaurant.name}`;

		return {
			title,
			description,
			keywords: [restaurant.cuisine, "restaurant", restaurant.name].filter(Boolean),
			openGraph: {
				title,
				description,
				url: pageUrl,
				type: "website",
				siteName: restaurant.name,
				...(restaurant.heroImage && {
					images: [{url: `${siteUrl}${restaurant.heroImage}`, alt: restaurant.name}],
				}),
			},
			twitter: {
				card: restaurant.heroImage ? "summary_large_image" : "summary",
				title,
				description,
				...(restaurant.heroImage && {
					images: [`${siteUrl}${restaurant.heroImage}`],
				}),
			},
		};
	}
	catch {
		return {title: "Restaurant Not Found"};
	}
}

export default async function PublishedSitePage({
	                                                params,
                                                }: PublishedSitePageProps) {
	const {slug} = await params;

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

	const headersList = await headers();
	const siteUrl = getSiteUrl(headersList);
	const jsonLd = buildRestaurantJsonLd(restaurant, menu, siteUrl);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
			/>
			<Template restaurant={restaurant} menu={menu} colorVars={colorVars}/>
		</>
	);
}
