import {getPrisma} from "@/lib/prisma";
import {NotFoundError, ValidationError} from "@/lib/errors";
import type {ItemInput, ItemUpdate, MenuItemResponse, MenuSectionResponse, SectionInput, SectionUpdate,} from "@/types/menu";

function toItemResponse(row: Record<string, unknown>): MenuItemResponse {
	return {
		id: row.id as number,
		name: row.name as string,
		description: row.description as string,
		price: row.price as number,
		image: row.image as string,
		dietaryTags: JSON.parse(row.dietaryTags as string) as string[],
		sortOrder: row.sortOrder as number,
		available: row.available as boolean,
		menuSectionId: row.menuSectionId as number,
	};
}

function toSectionResponse(
	section: Record<string, unknown>,
	items: Record<string, unknown>[],
): MenuSectionResponse {
	return {
		id: section.id as number,
		name: section.name as string,
		description: section.description as string,
		sortOrder: section.sortOrder as number,
		restaurantId: section.restaurantId as number,
		items: items.map(toItemResponse),
	};
}

// --- Sections ---

export async function getFullMenu(restaurantId: number): Promise<MenuSectionResponse[]> {
	const prisma = getPrisma();
	const sections = await prisma.menuSection.findMany({
		where: {restaurantId},
		include: {items: {orderBy: {sortOrder: "asc"}}},
		orderBy: {sortOrder: "asc"},
	});

	return sections.map((s) => {
		const {items, ...section} = s;
		return toSectionResponse(
			section as unknown as Record<string, unknown>,
			items as unknown as Record<string, unknown>[],
		);
	});
}

export async function createSection(
	restaurantId: number,
	data: SectionInput,
): Promise<MenuSectionResponse> {
	const prisma = getPrisma();

	if (!data.name?.trim()) {
		throw new ValidationError("Section name is required");
	}

	const maxOrder = await prisma.menuSection.aggregate({
		where: {restaurantId},
		_max: {sortOrder: true},
	});

	const section = await prisma.menuSection.create({
		data: {
			name: data.name.trim(),
			description: data.description ?? "",
			sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
			restaurantId,
		},
		include: {items: true},
	});

	const {items, ...rest} = section;
	return toSectionResponse(
		rest as unknown as Record<string, unknown>,
		items as unknown as Record<string, unknown>[],
	);
}

export async function updateSection(data: SectionUpdate): Promise<MenuSectionResponse> {
	const prisma = getPrisma();

	const existing = await prisma.menuSection.findUnique({where: {id: data.id}});
	if (!existing) {
		throw new NotFoundError(`Section ${data.id} not found`);
	}

	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) {
		if (!data.name.trim()) {
			throw new ValidationError("Section name cannot be empty");
		}
		updateData.name = data.name.trim();
	}
	if (data.description !== undefined) updateData.description = data.description;
	if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

	const section = await prisma.menuSection.update({
		where: {id: data.id},
		data: updateData,
		include: {items: {orderBy: {sortOrder: "asc"}}},
	});

	const {items, ...rest} = section;
	return toSectionResponse(
		rest as unknown as Record<string, unknown>,
		items as unknown as Record<string, unknown>[],
	);
}

export async function deleteSection(sectionId: number): Promise<void> {
	const prisma = getPrisma();

	const existing = await prisma.menuSection.findUnique({where: {id: sectionId}});
	if (!existing) {
		throw new NotFoundError(`Section ${sectionId} not found`);
	}

	await prisma.menuSection.delete({where: {id: sectionId}});
}

// --- Items ---

export async function createItem(data: ItemInput): Promise<MenuItemResponse> {
	const prisma = getPrisma();

	if (!data.name?.trim()) {
		throw new ValidationError("Item name is required");
	}
	if (data.price == null || data.price < 0) {
		throw new ValidationError("Item price must be a non-negative number");
	}

	const section = await prisma.menuSection.findUnique({where: {id: data.sectionId}});
	if (!section) {
		throw new NotFoundError(`Section ${data.sectionId} not found`);
	}

	const maxOrder = await prisma.menuItem.aggregate({
		where: {menuSectionId: data.sectionId},
		_max: {sortOrder: true},
	});

	const item = await prisma.menuItem.create({
		data: {
			name: data.name.trim(),
			description: data.description ?? "",
			price: data.price,
			image: data.image ?? "",
			dietaryTags: JSON.stringify(data.dietaryTags ?? []),
			sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
			available: data.available ?? true,
			menuSectionId: data.sectionId,
		},
	});

	return toItemResponse(item as unknown as Record<string, unknown>);
}

export async function updateItem(data: ItemUpdate): Promise<MenuItemResponse> {
	const prisma = getPrisma();

	const existing = await prisma.menuItem.findUnique({where: {id: data.id}});
	if (!existing) {
		throw new NotFoundError(`Item ${data.id} not found`);
	}

	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) {
		if (!data.name.trim()) {
			throw new ValidationError("Item name cannot be empty");
		}
		updateData.name = data.name.trim();
	}
	if (data.price !== undefined) {
		if (data.price < 0) {
			throw new ValidationError("Item price must be a non-negative number");
		}
		updateData.price = data.price;
	}
	if (data.description !== undefined) updateData.description = data.description;
	if (data.image !== undefined) updateData.image = data.image;
	if (data.dietaryTags !== undefined) updateData.dietaryTags = JSON.stringify(data.dietaryTags);
	if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
	if (data.available !== undefined) updateData.available = data.available;

	const item = await prisma.menuItem.update({
		where: {id: data.id},
		data: updateData,
	});

	return toItemResponse(item as unknown as Record<string, unknown>);
}

export async function deleteItem(itemId: number): Promise<void> {
	const prisma = getPrisma();

	const existing = await prisma.menuItem.findUnique({where: {id: itemId}});
	if (!existing) {
		throw new NotFoundError(`Item ${itemId} not found`);
	}

	await prisma.menuItem.delete({where: {id: itemId}});
}
