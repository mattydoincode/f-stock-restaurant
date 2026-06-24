import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";

test.describe("Responsive Layout", () => {
	test.beforeEach(async () => {
		await seedRestaurant({
			name: "Responsive Bistro",
			cuisine: "French",
			published: true,
			withMenu: true,
			phone: "(555) 777-3333",
			address: "50 Boulevard Saint-Germain",
			hours: {monday: {open: "12:00", close: "23:00"}},
		});
	});

	test("published site renders correctly on desktop", async ({page}) => {
		await page.setViewportSize({width: 1280, height: 720});
		await page.goto("/s/responsive-bistro");

		// Core content is visible
		await expect(page.getByText("Responsive Bistro").first()).toBeVisible();
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.getByText("Bruschetta")).toBeVisible();
		await expect(page.getByText("Main Courses")).toBeVisible();
		await expect(page.getByText("(555) 777-3333").first()).toBeVisible();

		// No horizontal overflow
		const body = page.locator("body");
		const bodyWidth = await body.evaluate((el) => el.scrollWidth);
		const viewportWidth = 1280;
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
	});

	test("published site renders correctly on mobile", async ({page}) => {
		await page.setViewportSize({width: 375, height: 667});
		await page.goto("/s/responsive-bistro");

		// Core content is visible on mobile
		await expect(page.getByText("Responsive Bistro").first()).toBeVisible();
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.getByText("Bruschetta")).toBeVisible();
		await expect(page.getByText("(555) 777-3333").first()).toBeVisible();

		// No horizontal overflow on mobile
		const body = page.locator("body");
		const bodyWidth = await body.evaluate((el) => el.scrollWidth);
		const viewportWidth = 375;
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
	});

	test("published site renders correctly on tablet", async ({page}) => {
		await page.setViewportSize({width: 768, height: 1024});
		await page.goto("/s/responsive-bistro");

		await expect(page.getByText("Responsive Bistro").first()).toBeVisible();
		await expect(page.getByText("Appetizers")).toBeVisible();

		// No horizontal overflow
		const body = page.locator("body");
		const bodyWidth = await body.evaluate((el) => el.scrollWidth);
		expect(bodyWidth).toBeLessThanOrEqual(768);
	});
});
