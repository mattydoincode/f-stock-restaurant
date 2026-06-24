import {getPrisma} from "@/lib/prisma";
import {slugify} from "@/lib/slugify";
import {ConflictError, NotFoundError, ValidationError} from "@/lib/errors";
import type {RestaurantInput, RestaurantResponse, RestaurantUpdate, WeeklyHours,} from "@/types/restaurant";

function toResponse(row: Record<string, unknown>): RestaurantResponse {
	return {
		...(row as Omit<RestaurantResponse, "hours" | "galleryImages" | "createdAt" | "updatedAt">),
		hours: JSON.parse(row.hours as string) as WeeklyHours,
		galleryImages: JSON.parse(row.galleryImages as string) as string[],
		createdAt: (row.createdAt as Date).toISOString(),
		updatedAt: (row.updatedAt as Date).toISOString(),
	};
}

export async function getRestaurant(): Promise<RestaurantResponse> {
	const prisma = getPrisma();
	const restaurant = await prisma.restaurant.findFirst();
	if (!restaurant) {
		throw new NotFoundError("No restaurant found");
	}
	return toResponse(restaurant as unknown as Record<string, unknown>);
}

export async function getRestaurantBySlug(slug: string): Promise<RestaurantResponse> {
	const prisma = getPrisma();
	const restaurant = await prisma.restaurant.findFirst({where: {slug}});
	if (!restaurant || !(restaurant as unknown as Record<string, unknown>).published) {
		throw new NotFoundError("Restaurant not found");
	}
	return toResponse(restaurant as unknown as Record<string, unknown>);
}

export async function createRestaurant(data: RestaurantInput): Promise<RestaurantResponse> {
	const prisma = getPrisma();

	if (!data.name?.trim()) {
		throw new ValidationError("Restaurant name is required");
	}

	const existing = await prisma.restaurant.findFirst();
	if (existing) {
		throw new ConflictError("A restaurant already exists");
	}

	const restaurant = await prisma.restaurant.create({
		data: {
			name: data.name.trim(),
			slug: slugify(data.name),
			cuisine: data.cuisine ?? "",
			description: data.description ?? "",
			logo: data.logo ?? "",
			heroImage: data.heroImage ?? "",
			phone: data.phone ?? "",
			email: data.email ?? "",
			address: data.address ?? "",
			mapEmbed: data.mapEmbed ?? "",
			hours: JSON.stringify(data.hours ?? {}),
			theme: data.theme ?? "bistro",
			colorScheme: data.colorScheme ?? "default",
			galleryImages: JSON.stringify(data.galleryImages ?? []),
		},
	});

	return toResponse(restaurant as unknown as Record<string, unknown>);
}

export async function updateRestaurant(data: RestaurantUpdate): Promise<RestaurantResponse> {
	const prisma = getPrisma();

	const existing = await prisma.restaurant.findFirst();
	if (!existing) {
		throw new NotFoundError("No restaurant found");
	}

	const updateData: Record<string, unknown> = {};

	if (data.name !== undefined) {
		if (!data.name.trim()) {
			throw new ValidationError("Restaurant name cannot be empty");
		}
		updateData.name = data.name.trim();
		updateData.slug = slugify(data.name);
	}
	if (data.cuisine !== undefined) updateData.cuisine = data.cuisine;
	if (data.description !== undefined) updateData.description = data.description;
	if (data.logo !== undefined) updateData.logo = data.logo;
	if (data.heroImage !== undefined) updateData.heroImage = data.heroImage;
	if (data.phone !== undefined) updateData.phone = data.phone;
	if (data.email !== undefined) updateData.email = data.email;
	if (data.address !== undefined) updateData.address = data.address;
	if (data.mapEmbed !== undefined) updateData.mapEmbed = data.mapEmbed;
	if (data.hours !== undefined) updateData.hours = JSON.stringify(data.hours);
	if (data.theme !== undefined) updateData.theme = data.theme;
	if (data.colorScheme !== undefined) updateData.colorScheme = data.colorScheme;
	if (data.published !== undefined) updateData.published = data.published;
	if (data.galleryImages !== undefined) updateData.galleryImages = JSON.stringify(data.galleryImages);

	const restaurant = await prisma.restaurant.update({
		where: {id: existing.id},
		data: updateData,
	});

	return toResponse(restaurant as unknown as Record<string, unknown>);
}
