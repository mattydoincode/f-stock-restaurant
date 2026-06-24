import "dotenv/config";
import {PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";
import {PrismaClient} from "../src/generated/prisma/client";

async function seed() {
	const adapter = new PrismaBetterSqlite3({
		url: process.env.DATABASE_URL!,
	});
	const prisma = new PrismaClient({adapter});

	try {
		// Clear existing data (idempotent)
		await prisma.menuItem.deleteMany();
		await prisma.menuSection.deleteMany();
		await prisma.restaurant.deleteMany();

		// Create sample restaurant
		const restaurant = await prisma.restaurant.create({
			data: {
				name: "Bella Cucina",
				slug: "bella-cucina",
				cuisine: "Italian",
				description:
					"A warm, family-owned Italian restaurant serving handmade pasta and wood-fired pizza since 1998. Every dish is crafted with imported ingredients and generations of tradition.",
				phone: "(555) 234-5678",
				email: "info@bellacucina.example.com",
				address: "742 Evergreen Terrace, Springfield, IL 62704",
				theme: "bistro",
				colorScheme: "default",
				published: true,
				hours: JSON.stringify({
					monday: {open: "11:00", close: "21:00"},
					tuesday: {open: "11:00", close: "21:00"},
					wednesday: {open: "11:00", close: "21:00"},
					thursday: {open: "11:00", close: "22:00"},
					friday: {open: "11:00", close: "23:00"},
					saturday: {open: "10:00", close: "23:00"},
					sunday: {open: "10:00", close: "20:00"},
				}),
				galleryImages: JSON.stringify([]),
			},
		});

		// Antipasti section
		const antipasti = await prisma.menuSection.create({
			data: {
				name: "Antipasti",
				description: "Start your meal with our classic Italian appetizers",
				sortOrder: 0,
				restaurantId: restaurant.id,
			},
		});

		await prisma.menuItem.createMany({
			data: [
				{
					name: "Bruschetta al Pomodoro",
					description:
						"Grilled bread topped with fresh tomatoes, basil, garlic, and extra virgin olive oil",
					price: 12.5,
					dietaryTags: JSON.stringify(["vegetarian"]),
					sortOrder: 0,
					menuSectionId: antipasti.id,
				},
				{
					name: "Carpaccio di Manzo",
					description:
						"Thinly sliced raw beef with arugula, capers, shaved Parmigiano, and lemon dressing",
					price: 18.0,
					dietaryTags: JSON.stringify(["gluten-free"]),
					sortOrder: 1,
					menuSectionId: antipasti.id,
				},
				{
					name: "Calamari Fritti",
					description: "Lightly fried squid rings served with marinara sauce and lemon wedges",
					price: 15.0,
					dietaryTags: JSON.stringify([]),
					sortOrder: 2,
					menuSectionId: antipasti.id,
				},
			],
		});

		// Primi Piatti section
		const primi = await prisma.menuSection.create({
			data: {
				name: "Primi Piatti",
				description: "Handmade pasta and risotto dishes",
				sortOrder: 1,
				restaurantId: restaurant.id,
			},
		});

		await prisma.menuItem.createMany({
			data: [
				{
					name: "Tagliatelle al Ragù",
					description:
						"Fresh egg tagliatelle with slow-cooked Bolognese meat sauce and Parmigiano",
					price: 22.0,
					dietaryTags: JSON.stringify([]),
					sortOrder: 0,
					menuSectionId: primi.id,
				},
				{
					name: "Risotto ai Funghi Porcini",
					description:
						"Creamy Arborio rice with wild porcini mushrooms, white wine, and truffle oil",
					price: 24.0,
					dietaryTags: JSON.stringify(["vegetarian", "gluten-free"]),
					sortOrder: 1,
					menuSectionId: primi.id,
				},
				{
					name: "Spaghetti alle Vongole",
					description:
						"Spaghetti with fresh clams, garlic, white wine, chili flakes, and parsley",
					price: 21.0,
					dietaryTags: JSON.stringify(["dairy-free"]),
					sortOrder: 2,
					menuSectionId: primi.id,
				},
			],
		});

		// Dolci section
		const dolci = await prisma.menuSection.create({
			data: {
				name: "Dolci",
				description: "Sweet endings to your meal",
				sortOrder: 2,
				restaurantId: restaurant.id,
			},
		});

		await prisma.menuItem.createMany({
			data: [
				{
					name: "Tiramisù",
					description:
						"Classic layered dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa",
					price: 12.0,
					dietaryTags: JSON.stringify(["vegetarian"]),
					sortOrder: 0,
					menuSectionId: dolci.id,
				},
				{
					name: "Panna Cotta",
					description: "Silky vanilla bean custard with seasonal berry compote",
					price: 11.0,
					dietaryTags: JSON.stringify(["vegetarian", "gluten-free"]),
					sortOrder: 1,
					menuSectionId: dolci.id,
				},
			],
		});

		console.log("Seed complete: Bella Cucina with 3 sections and 8 items");
	}
	finally {
		await prisma.$disconnect();
	}
}

seed();
