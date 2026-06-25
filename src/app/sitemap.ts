import type {MetadataRoute} from "next";
import {getPrisma} from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const prisma = getPrisma();
	const restaurants = await prisma.restaurant.findMany({
		where: {published: true},
		select: {slug: true, updatedAt: true},
	});

	return [
		{url: "/", lastModified: new Date()},
		...restaurants.map((r) => ({
			url: `/s/${r.slug}`,
			lastModified: r.updatedAt,
		})),
	];
}

