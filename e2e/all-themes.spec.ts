import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";

const THEMES = [
	{id: "bistro", name: "Bistro", bgClass: "bg-neutral-950"},
	{id: "fresh", name: "Fresh", bgClass: "bg-white"},
	{id: "trattoria", name: "Trattoria", bgClass: "bg-amber-50"},
];

for (const theme of THEMES) {
	test.describe(`${theme.name} theme`, () => {
		test.beforeEach(async () => {
			await seedRestaurant({
				name: "Theme Test Restaurant",
				cuisine: "American",
				description: "Testing all themes with the same data",
				theme: theme.id,
				published: true,
				withMenu: true,
				phone: "(555) 444-5555",
				email: "test@themes.com",
				address: "789 Theme Lane",
				hours: {
					monday: {open: "10:00", close: "22:00"},
					friday: {open: "10:00", close: "23:00"},
					saturday: {open: "11:00", close: "23:00"},
				},
			});
		});

		test(`renders correctly at /s/[slug]`, async ({page}) => {
			await page.goto("/s/theme-test-restaurant");

			// Template-specific background class
			await expect(page.locator(`[class*='${theme.bgClass}']`).first()).toBeVisible();

			// Restaurant name is visible (appears in header and footer — use first)
			await expect(page.getByText("Theme Test Restaurant").first()).toBeVisible();

			// Menu sections and items are rendered
			await expect(page.getByText("Appetizers")).toBeVisible();
			await expect(page.getByText("Bruschetta")).toBeVisible();
			await expect(page.getByText("Calamari")).toBeVisible();
			await expect(page.getByText("Main Courses")).toBeVisible();
			await expect(page.getByText("Margherita Pizza")).toBeVisible();
			await expect(page.getByText("Spaghetti Carbonara")).toBeVisible();

			// Contact info is visible (may appear in multiple sections)
			await expect(page.getByText("(555) 444-5555").first()).toBeVisible();
			await expect(page.getByText("789 Theme Lane").first()).toBeVisible();
		});

		test(`renders menu item prices`, async ({page}) => {
			await page.goto("/s/theme-test-restaurant");

			// Prices should be displayed (format may vary by template)
			await expect(page.getByText("9.50").or(page.getByText("$9.50")).or(page.getByText("9.5"))).toBeVisible();
			await expect(page.getByText("16").or(page.getByText("$16")).or(page.getByText("16.00"))).toBeVisible();
		});
	});
}
