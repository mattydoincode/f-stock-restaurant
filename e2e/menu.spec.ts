import {expect, test} from "@playwright/test";
import {seedRestaurant} from "./helpers/seed";
import path from "path";

test.describe("Menu Editor", () => {
	test.beforeEach(async () => {
		await seedRestaurant();
	});

	test("can add a menu section and items", async ({page}) => {
		await page.goto("/dashboard/menu");
		await expect(page.getByText("Menu Editor")).toBeVisible();

		// Menu should be empty initially
		await expect(page.getByText("Your menu is empty")).toBeVisible();

		// Add a section
		await page.getByRole("button", {name: "Add Section"}).first().click();
		await expect(page.getByText("New Menu Section")).toBeVisible();
		await page.getByLabel("Section Name").fill("Appetizers");
		await page.getByRole("button", {name: "Create"}).click();

		// Section should appear
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.getByText("No items yet")).toBeVisible();

		// Add an item to the section
		await page.getByPlaceholder("New item name").fill("Bruschetta");
		await page.locator("input[type='number'][placeholder='0.00']").fill("9.50");
		await page.getByRole("button", {name: "Add item"}).click();

		// Item should appear in the section
		await expect(page.locator("input[value='Bruschetta']")).toBeVisible();

		// Add a second item
		await page.getByPlaceholder("New item name").fill("Calamari");
		await page.locator("input[type='number'][placeholder='0.00']").fill("12.00");
		await page.getByRole("button", {name: "Add item"}).click();

		await expect(page.locator("input[value='Calamari']")).toBeVisible();

		// Reload and verify persistence
		await page.reload();
		await expect(page.getByText("Appetizers")).toBeVisible();
		await expect(page.locator("input[value='Bruschetta']")).toBeVisible();
		await expect(page.locator("input[value='Calamari']")).toBeVisible();
	});

	test("can add a photo to a menu item", async ({page}) => {
		await page.goto("/dashboard/menu");

		// Add a section and item first
		await page.getByRole("button", {name: "Add Section"}).first().click();
		await page.getByLabel("Section Name").fill("Mains");
		await page.getByRole("button", {name: "Create"}).click();
		await page.getByPlaceholder("New item name").fill("Pizza");
		await page.locator("input[type='number'][placeholder='0.00']").fill("16.00");
		await page.getByRole("button", {name: "Add item"}).click();

		// Expand the item to show the photo upload
		await page.getByText("Add description, photo, tags...").click();
		await expect(page.getByText("Photo", {exact: true})).toBeVisible();

		// Upload a photo via the file input
		const fileInput = page.locator("input[type='file']").first();
		await fileInput.setInputFiles(path.join(__dirname, "fixtures/test-image.jpg"));

		// Wait for upload to complete — the image should appear
		await expect(page.locator("img").first()).toBeVisible({timeout: 5000});
	});

	test("can reorder menu items", async ({page}) => {
		// Seed with menu data so we have items to reorder
		await seedRestaurant({withMenu: true});
		await page.goto("/dashboard/menu");

		// Wait for menu to load — should see "Appetizers" section
		await expect(page.getByText("Appetizers")).toBeVisible();

		// Get all item name inputs within the Appetizers section
		// Bruschetta (sortOrder 0) should be first, Calamari (sortOrder 1) second
		const firstItem = page.locator("input[value='Bruschetta']");
		const secondItem = page.locator("input[value='Calamari']");
		await expect(firstItem).toBeVisible();
		await expect(secondItem).toBeVisible();

		// Move Bruschetta down (it's first, so it has a "move down" button)
		// The move-down button is within the first item's row
		const firstItemRow = firstItem.locator("xpath=ancestor::div[contains(@class, 'rounded-lg border')]");
		await firstItemRow.getByRole("button", {name: /down/i}).click();

		// After reorder, reload and verify Calamari is now first
		await page.reload();
		const itemInputs = page.locator("div.space-y-2.rounded-lg.border input[placeholder='Item name']");
		await expect(itemInputs.first()).toHaveValue("Calamari");
		await expect(itemInputs.nth(1)).toHaveValue("Bruschetta");
	});
});
