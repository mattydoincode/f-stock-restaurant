import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";
import path from "path";

test.describe("Photo Gallery", () => {
	test.beforeEach(async () => {
		await seedRestaurant();
	});

	test("can upload a hero image", async ({page}) => {
		await page.goto("/dashboard/photos");
		await expect(page.getByText("Photo Gallery")).toBeVisible();

		// The hero image card has the label text "Upload hero image"
		// Its file input is the first one on the page
		const fileInput = page.locator("input[type='file']").first();
		await fileInput.setInputFiles(path.join(__dirname, "fixtures/test-image.jpg"));

		// Wait for upload — an img tag should appear
		await expect(page.getByText("Saved")).toBeVisible({timeout: 10000});

		// Reload and verify hero image persists
		await page.reload();
		// After reload, the hero section should show an img (not just the upload prompt)
		await expect(page.locator("img[alt='']").first()).toBeVisible({timeout: 5000});
	});

	test("can upload gallery images", async ({page}) => {
		await page.goto("/dashboard/photos");

		// Should show "No gallery photos yet" initially
		await expect(page.getByText("No gallery photos yet")).toBeVisible();

		// The gallery file input is the second one on the page (after hero)
		const fileInput = page.locator("input[type='file']").nth(1);
		await fileInput.setInputFiles(path.join(__dirname, "fixtures/test-image.jpg"));

		// Wait for image to appear and "No gallery photos" to disappear
		await expect(page.getByText("No gallery photos yet")).toBeHidden({timeout: 10000});

		// Wait for save
		await expect(page.getByText("Saved")).toBeVisible({timeout: 5000});

		// Reload and verify
		await page.reload();
		await expect(page.getByText("No gallery photos yet")).toBeHidden({timeout: 5000});
	});

	test("can remove a gallery image", async ({page}) => {
		// Seed with a gallery image already present
		await seedRestaurant({galleryImages: ["/uploads/test-placeholder.jpg"]});
		await page.goto("/dashboard/photos");

		// Gallery should have an image
		const galleryImages = page.locator("img[alt^='Gallery image']");
		await expect(galleryImages).toHaveCount(1);

		// Hover over the immediate image container and click the remove button
		const imageContainer = galleryImages.first().locator("xpath=ancestor::div[contains(@class, 'group relative')]");
		await imageContainer.hover();
		await page.getByRole("button", {name: "Remove image"}).click();

		// Wait for removal and save
		await expect(page.getByText("No gallery photos yet")).toBeVisible({timeout: 5000});
	});
});
