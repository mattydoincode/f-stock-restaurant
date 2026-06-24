import {ORDERED_DAYS} from "@/lib/site-utils";
import type {RestaurantResponse} from "@/types/restaurant";
import type {MenuSectionResponse} from "@/types/menu";

const DAY_MAP: Record<string, string> = {
	monday: "Monday",
	tuesday: "Tuesday",
	wednesday: "Wednesday",
	thursday: "Thursday",
	friday: "Friday",
	saturday: "Saturday",
	sunday: "Sunday",
};

const DIET_MAP: Record<string, string> = {
	"vegetarian": "https://schema.org/VegetarianDiet",
	"vegan": "https://schema.org/VeganDiet",
	"gluten-free": "https://schema.org/GlutenFreeDiet",
	"dairy-free": "https://schema.org/DairyFreeDiet",
	"halal": "https://schema.org/HalalDiet",
	"kosher": "https://schema.org/KosherDiet",
};

export function buildRestaurantJsonLd(
	restaurant: RestaurantResponse,
	menu: MenuSectionResponse[],
	siteUrl: string,
) {
	const url = `${siteUrl}/s/${restaurant.slug}`;

	const openingHours = ORDERED_DAYS
		.filter((day) => restaurant.hours[day])
		.map((day) => ({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: DAY_MAP[day],
			opens: restaurant.hours[day].open,
			closes: restaurant.hours[day].close,
		}));

	const menuSections = menu.map((section) => ({
		"@type": "MenuSection",
		name: section.name,
		description: section.description || undefined,
		hasMenuItem: section.items
			.filter((item) => item.available)
			.map((item) => {
				const menuItem: Record<string, unknown> = {
					"@type": "MenuItem",
					name: item.name,
					description: item.description || undefined,
					offers: {
						"@type": "Offer",
						price: item.price.toFixed(2),
						priceCurrency: "USD",
					},
				};
				if (item.image) {
					menuItem.image = `${siteUrl}${item.image}`;
				}
				const diets = item.dietaryTags
					.map((tag) => DIET_MAP[tag])
					.filter(Boolean);
				if (diets.length > 0) {
					menuItem.suitableForDiet = diets;
				}
				return menuItem;
			}),
	}));

	const jsonLd: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "Restaurant",
		name: restaurant.name,
		url,
		description: restaurant.description || undefined,
		servesCuisine: restaurant.cuisine || undefined,
		telephone: restaurant.phone || undefined,
		email: restaurant.email || undefined,
	};

	if (restaurant.address) {
		jsonLd.address = {
			"@type": "PostalAddress",
			streetAddress: restaurant.address,
		};
	}

	if (restaurant.heroImage) {
		jsonLd.image = `${siteUrl}${restaurant.heroImage}`;
	}

	if (openingHours.length > 0) {
		jsonLd.openingHoursSpecification = openingHours;
	}

	if (menuSections.length > 0) {
		jsonLd.hasMenu = {
			"@type": "Menu",
			hasMenuSection: menuSections,
		};
	}

	return jsonLd;
}
