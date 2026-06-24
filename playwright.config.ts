import {defineConfig, devices} from "@playwright/test";

const isUI = !!process.env.PLAYWRIGHT_UI;

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,
	reporter: "html",
	use: {
		baseURL: "http://localhost:3000",
		trace: isUI ? "on" : "retain-on-failure",
		screenshot: isUI ? "on" : "only-on-failure",
		video: isUI ? "on" : "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: {...devices["Desktop Chrome"]},
		},
	],
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
