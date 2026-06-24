import {getTestDb, resetDatabase} from "./reset-db";

export interface SeedOptions {
	name?: string;
	cuisine?: string;
	description?: string;
	theme?: string;
	colorScheme?: string;
	published?: boolean;
	phone?: string;
	email?: string;
	address?: string;
	heroImage?: string;
	hours?: Record<string, { open: string; close: string }>;
	galleryImages?: string[];
	withMenu?: boolean;
}

export function seedRestaurant(opts: SeedOptions = {}) {
	resetDatabase();
	const db = getTestDb();

	const name = opts.name ?? "Test Restaurant";
	const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

	const insert = db.prepare(`
		INSERT INTO Restaurant (name, slug, cuisine, description, theme, colorScheme, published, phone, email, address, heroImage, hours, galleryImages, mapEmbed, logo, createdAt, updatedAt)
		VALUES (@name, @slug, @cuisine, @description, @theme, @colorScheme, @published, @phone, @email, @address, @heroImage, @hours, @galleryImages, @mapEmbed, @logo, datetime('now'), datetime('now'))
	`);

	const result = insert.run({
		name,
		slug,
		cuisine: opts.cuisine ?? "Italian",
		description: opts.description ?? "A cozy family restaurant serving authentic Italian dishes.",
		theme: opts.theme ?? "bistro",
		colorScheme: opts.colorScheme ?? "default",
		published: opts.published ? 1 : 0,
		phone: opts.phone ?? "",
		email: opts.email ?? "",
		address: opts.address ?? "",
		heroImage: opts.heroImage ?? "",
		hours: JSON.stringify(opts.hours ?? {}),
		galleryImages: JSON.stringify(opts.galleryImages ?? []),
		mapEmbed: "",
		logo: "",
	});

	const restaurantId = result.lastInsertRowid;

	if (opts.withMenu) {
		const insertSection = db.prepare(`
			INSERT INTO MenuSection (name, description, sortOrder, restaurantId, createdAt, updatedAt)
			VALUES (@name, @description, @sortOrder, @restaurantId, datetime('now'), datetime('now'))
		`);

		const insertItem = db.prepare(`
			INSERT INTO MenuItem (name, description, price, sortOrder, dietaryTags, menuSectionId, image, available, createdAt, updatedAt)
			VALUES (@name, @description, @price, @sortOrder, @dietaryTags, @menuSectionId, @image, @available, datetime('now'), datetime('now'))
		`);

		const appetizersResult = insertSection.run({
			name: "Appetizers",
			description: "Start your meal right",
			sortOrder: 0,
			restaurantId,
		});
		const appetizersId = appetizersResult.lastInsertRowid;

		insertItem.run({
			name: "Bruschetta",
			description: "Toasted bread with tomatoes and basil",
			price: 9.50,
			sortOrder: 0,
			dietaryTags: JSON.stringify(["vegetarian"]),
			menuSectionId: appetizersId,
			image: "",
			available: 1,
		});

		insertItem.run({
			name: "Calamari",
			description: "Crispy fried squid with marinara sauce",
			price: 12.00,
			sortOrder: 1,
			dietaryTags: JSON.stringify([]),
			menuSectionId: appetizersId,
			image: "",
			available: 1,
		});

		const mainsResult = insertSection.run({
			name: "Main Courses",
			description: "Hearty entrees",
			sortOrder: 1,
			restaurantId,
		});
		const mainsId = mainsResult.lastInsertRowid;

		insertItem.run({
			name: "Margherita Pizza",
			description: "Classic tomato, mozzarella, and basil",
			price: 16.00,
			sortOrder: 0,
			dietaryTags: JSON.stringify(["vegetarian"]),
			menuSectionId: mainsId,
			image: "",
			available: 1,
		});

		insertItem.run({
			name: "Spaghetti Carbonara",
			description: "Pasta with pancetta, egg, and parmesan",
			price: 18.50,
			sortOrder: 1,
			dietaryTags: JSON.stringify([]),
			menuSectionId: mainsId,
			image: "",
			available: 1,
		});
	}

	db.close();
	return {id: restaurantId, slug};
}
