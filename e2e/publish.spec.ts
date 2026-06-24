import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";

test.describe("Publish", () => {
	test("can publish and visit the shareable URL", async ({page}) => {
		await seedRestaurant({
			name: "Bella Cucina",
			cuisine: "Italian",
			description: "Authentic Italian flavors",
			withMenu: true,
			phone: "(555) 888-1234",
			address: "100 Pine Avenue",
			hours: {
				monday: {open: "11:00", close: "22:00"},
				tuesday: {open: "11:00", close: "22:00"},
			},
		});

		// Navigate to preview
		await page.goto("/dashboard/preview");
		await expect(page.getByText("Back to Dashboard")).toBeVisible({timeout: 10000});

		// Should show "Draft" badge initially
		await expect(page.getByText("Draft")).toBeVisible();

		// Click Publish
		await page.getByRole("button", {name: "Publish"}).click();

		// Should now show "Published" badge
		await expect(page.getByText("Published")).toBeVisible({timeout: 5000});

		// Share button should appear
		await expect(page.getByRole("button", {name: "Share"})).toBeVisible();

		// Visit the published URL directly
		await page.goto("/s/bella-cucina");

		// Verify the published site renders with content
		await expect(page.getByText("Bella Cucina").first()).toBeVisible();
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.getByText("Bruschetta")).toBeVisible();
		await expect(page.getByText("(555) 888-1234").first()).toBeVisible();
		await expect(page.getByText("100 Pine Avenue").first()).toBeVisible();
	});

	test("unpublished site returns 404", async ({page}) => {
		await seedRestaurant({name: "Hidden Gem", published: false});

		const response = await page.goto("/s/hidden-gem");
		expect(response?.status()).toBe(404);
	});

	test("can unpublish a published site", async ({page}) => {
		await seedRestaurant({name: "Toggle Test", published: true, withMenu: true});

		await page.goto("/dashboard/preview");
		await expect(page.getByText("Published")).toBeVisible({timeout: 10000});

		// Click Unpublish
		await page.getByRole("button", {name: "Unpublish"}).click();
		await expect(page.getByText("Draft")).toBeVisible({timeout: 5000});

		// Published URL should now 404
		const response = await page.goto("/s/toggle-test");
		expect(response?.status()).toBe(404);
	});
});
