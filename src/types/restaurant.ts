export interface HoursEntry {
	open: string;
	close: string;
}

export type WeeklyHours = Record<string, HoursEntry>;

export interface RestaurantInput {
	name: string;
	cuisine?: string;
	description?: string;
	logo?: string;
	heroImage?: string;
	phone?: string;
	email?: string;
	address?: string;
	mapEmbed?: string;
	hours?: WeeklyHours;
	theme?: string;
	colorScheme?: string;
	galleryImages?: string[];
}

export interface RestaurantUpdate {
	name?: string;
	cuisine?: string;
	description?: string;
	logo?: string;
	heroImage?: string;
	phone?: string;
	email?: string;
	address?: string;
	mapEmbed?: string;
	hours?: WeeklyHours;
	theme?: string;
	colorScheme?: string;
	published?: boolean;
	galleryImages?: string[];
}

export interface RestaurantResponse {
	id: number;
	name: string;
	slug: string;
	cuisine: string;
	description: string;
	logo: string;
	heroImage: string;
	phone: string;
	email: string;
	address: string;
	mapEmbed: string;
	hours: WeeklyHours;
	theme: string;
	colorScheme: string;
	published: boolean;
	galleryImages: string[];
	createdAt: string;
	updatedAt: string;
}
