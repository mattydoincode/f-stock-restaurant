import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";

test.describe("Theme & Preview", () => {
	test.beforeEach(async () => {
		await seedRestaurant({
			withMenu: true,
			phone: "(555) 999-0000",
			address: "42 Elm Street",
			hours: {monday: {open: "09:00", close: "21:00"}},
		});
	});

	test("can switch between themes on the theme page", async ({page}) => {
		await page.goto("/dashboard/theme");
		await expect(page.getByText("Theme Settings")).toBeVisible();

		// Default theme is bistro — click Fresh
		await page.getByText("Fresh").click();
		await expect(page.getByText("Saved")).toBeVisible({timeout: 5000});

		// Click Trattoria
		await page.getByText("Trattoria").click();
		await expect(page.getByText("Saved")).toBeVisible({timeout: 5000});

		// Reload and verify Trattoria is selected
		await page.reload();
		// The selected theme card should have some visual indicator
		// Verify by checking the data persisted — switch to preview and check
		await page.goto("/dashboard/preview");
		// Trattoria template has bg-amber-50 root div
		await expect(page.locator("[class*='bg-amber-50']").first()).toBeVisible({timeout: 10000});
	});

	test("preview shows a complete restaurant site", async ({page}) => {
		await page.goto("/dashboard/preview");

		// Should see the PreviewToolbar
		await expect(page.getByText("Back to Dashboard")).toBeVisible({timeout: 10000});

		// Should show restaurant name (appears in header and footer — use first)
		await expect(page.getByText("Test Restaurant").first()).toBeVisible();

		// Should show menu sections and items
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.getByText("Bruschetta")).toBeVisible();
		await expect(page.getByText("Main Courses")).toBeVisible();
		await expect(page.getByText("Margherita Pizza")).toBeVisible();

		// Should show contact info (may appear in multiple sections)
		await expect(page.getByText("(555) 999-0000").first()).toBeVisible();
		await expect(page.getByText("42 Elm Street").first()).toBeVisible();
	});

	test("each theme renders the preview differently", async ({page}) => {
		// Test Bistro
		await page.goto("/dashboard/preview");
		await expect(page.locator("[class*='bg-neutral-950']").first()).toBeVisible({timeout: 10000});

		// Switch to Fresh
		await page.goto("/dashboard/theme");
		await page.getByText("Fresh").click();
		await expect(page.getByText("Saved")).toBeVisible({timeout: 5000});
		await page.goto("/dashboard/preview");
		await expect(page.locator("[class*='bg-white']").first()).toBeVisible({timeout: 10000});

		// Switch to Trattoria
		await page.goto("/dashboard/theme");
		await page.getByText("Trattoria").click();
		await expect(page.getByText("Saved")).toBeVisible({timeout: 5000});
		await page.goto("/dashboard/preview");
		await expect(page.locator("[class*='bg-amber-50']").first()).toBeVisible({timeout: 10000});
	});
});
