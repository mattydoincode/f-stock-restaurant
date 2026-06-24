import {expect, test} from "@playwright/test";
import {resetDatabase} from "./helpers/reset-db";

test.describe("Onboarding Wizard", () => {
	test.beforeEach(async () => {
		resetDatabase();
	});

	test("can create a restaurant through the onboarding wizard", async ({page}) => {
		// Visiting dashboard with no restaurant should redirect to onboarding
		await page.goto("/dashboard");
		await expect(page).toHaveURL(/\/dashboard\/onboarding/, {timeout: 10000});

		// Step 1: Name & Cuisine
		await expect(page.getByText("Welcome to Goethena")).toBeVisible();
		const nextButton = page.getByRole("button", {name: "Next", exact: true});
		await expect(nextButton).toBeDisabled();

		await page.getByLabel("Restaurant Name").fill("Trattoria Roma");
		await page.getByLabel("Cuisine Type").fill("Italian");
		await expect(nextButton).toBeEnabled();
		await nextButton.click();

		// Step 2: Description
		await expect(page.getByText("Tell your story")).toBeVisible();
		await page.getByLabel("Description").fill("A family-owned restaurant in the heart of downtown.");
		await page.getByRole("button", {name: "Next", exact: true}).click();

		// Step 3: Theme Selection
		await expect(page.getByText("Pick a theme")).toBeVisible();
		// Bistro is selected by default — pick Fresh instead
		await page.getByText("Fresh").click();
		await page.getByRole("button", {name: "Create My Website"}).click();

		// Should redirect to dashboard overview
		await expect(page).toHaveURL("/dashboard", {timeout: 10000});
		await expect(page.getByRole("heading", {name: "Trattoria Roma"})).toBeVisible();
		await expect(page.getByText("Italian")).toBeVisible();
	});

	test("requires restaurant name before proceeding", async ({page}) => {
		await page.goto("/dashboard/onboarding");
		await expect(page.getByText("Welcome to Goethena")).toBeVisible();

		// Next button should be disabled without a name
		const nextButton = page.getByRole("button", {name: "Next", exact: true});
		await expect(nextButton).toBeDisabled();

		// Fill name → button becomes enabled
		await page.getByLabel("Restaurant Name").fill("My Place");
		await expect(nextButton).toBeEnabled();

		// Clear name → button becomes disabled again
		await page.getByLabel("Restaurant Name").clear();
		await expect(nextButton).toBeDisabled();
	});

	test("can skip the description step", async ({page}) => {
		await page.goto("/dashboard/onboarding");

		// Step 1
		await page.getByLabel("Restaurant Name").fill("Quick Start Cafe");
		await page.getByRole("button", {name: "Next", exact: true}).click();

		// Step 2 — skip (description is empty, button says "Skip")
		await expect(page.getByRole("button", {name: "Skip"})).toBeVisible();
		await page.getByRole("button", {name: "Skip"}).click();

		// Step 3 — should be on theme selection
		await expect(page.getByText("Pick a theme")).toBeVisible();
	});
});
