import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";

test.describe("Restaurant Info", () => {
	test.beforeEach(async () => {
		seedRestaurant();
	});

	test("can set contact info and verify it persists", async ({page}) => {
		await page.goto("/dashboard/info");
		await expect(page.getByText("Restaurant Info")).toBeVisible();

		// Fill in contact info
		await page.getByLabel("Phone Number").fill("(555) 123-4567");
		await page.getByLabel("Email").fill("hello@testrestaurant.com");

		// Wait for the actual PUT response (debounce + API round-trip)
		await page.waitForResponse(
			(res) => res.url().includes("/api/restaurant") && res.request().method() === "PUT" && res.ok(),
			{timeout: 10000},
		);

		// Reload and verify persistence
		await page.reload();
		await expect(page.getByLabel("Phone Number")).toHaveValue("(555) 123-4567", {timeout: 5000});
		await expect(page.getByLabel("Email")).toHaveValue("hello@testrestaurant.com");
	});

	test("can set address and verify it persists", async ({page}) => {
		await page.goto("/dashboard/info");

		await page.getByLabel("Address").fill("123 Main Street, Portland, OR 97201");

		// Wait for actual save
		await page.waitForResponse(
			(res) => res.url().includes("/api/restaurant") && res.request().method() === "PUT" && res.ok(),
			{timeout: 10000},
		);

		// Reload and verify
		await page.reload();
		await expect(page.getByLabel("Address")).toHaveValue("123 Main Street, Portland, OR 97201", {timeout: 5000});
	});

	test("can toggle hours for a day and verify they persist", async ({page}) => {
		await page.goto("/dashboard/info");

		// Scroll to hours section
		await page.getByText("Hours of Operation").scrollIntoViewIfNeeded();

		// All 7 day switches are inside the hours card. There are no other switches
		// on the info page, so getByRole("switch") scoped to the page finds them.
		// Monday is the first switch (days are ordered Mon-Sun in the editor).
		const mondaySwitch = page.getByRole("switch", {name: "Toggle Monday"});
		await expect(mondaySwitch).toBeVisible();
		await mondaySwitch.click();

		// After toggling on, time inputs should appear
		await expect(page.locator("input[type='time']").first()).toBeVisible();

		// Wait for the save to complete
		await page.waitForResponse(
			(res) => res.url().includes("/api/restaurant") && res.request().method() === "PUT" && res.ok(),
			{timeout: 10000},
		);

		// Reload and verify Monday is still toggled on
		await page.reload();
		await page.getByText("Hours of Operation").scrollIntoViewIfNeeded();

		// Monday should have time inputs visible (meaning it's toggled on, not "Closed")
		await expect(page.locator("input[type='time']").first()).toBeVisible({timeout: 5000});
	});
});
