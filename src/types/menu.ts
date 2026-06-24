export interface SectionInput {
	name: string;
	description?: string;
	sortOrder?: number;
}

export interface SectionUpdate {
	id: number;
	name?: string;
	description?: string;
	sortOrder?: number;
}

export interface ItemInput {
	sectionId: number;
	name: string;
	price: number;
	description?: string;
	image?: string;
	dietaryTags?: string[];
	sortOrder?: number;
	available?: boolean;
}

export interface ItemUpdate {
	id: number;
	name?: string;
	price?: number;
	description?: string;
	image?: string;
	dietaryTags?: string[];
	sortOrder?: number;
	available?: boolean;
}

export interface MenuItemResponse {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	dietaryTags: string[];
	sortOrder: number;
	available: boolean;
	menuSectionId: number;
}

export interface MenuSectionResponse {
	id: number;
	name: string;
	description: string;
	sortOrder: number;
	restaurantId: number;
	items: MenuItemResponse[];
}
