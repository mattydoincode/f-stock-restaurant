"use client";

import {useRestaurant} from "@/hooks/use-restaurant";
import {SaveIndicator} from "@/components/dashboard/save-indicator";
import {ThemeCard} from "@/components/dashboard/theme-card";
import {ColorPicker} from "@/components/dashboard/color-picker";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {COLOR_SCHEMES, THEMES} from "@/types/theme";

export default function ThemePage() {
	const {restaurant, loading, saveImmediate, status, errorMessage} =
		useRestaurant();

	if (loading || !restaurant) {
		return (
			<div className="flex items-center justify-center py-12 text-muted-foreground">
				Loading...
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Theme Settings</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Choose a template and color scheme for your website.
					</p>
				</div>
				<SaveIndicator status={status} errorMessage={errorMessage}/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Template</CardTitle>
					<CardDescription>
						Select a design template for your restaurant website
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-3">
						{THEMES.map((theme) => (
							<ThemeCard
								key={theme.id}
								theme={theme}
								selected={restaurant.theme === theme.id}
								onSelect={() => saveImmediate({theme: theme.id})}
							/>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Color Scheme</CardTitle>
					<CardDescription>
						Choose a color palette for your website
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ColorPicker
						schemes={COLOR_SCHEMES}
						selected={restaurant.colorScheme}
						onSelect={(id) => saveImmediate({colorScheme: id})}
					/>
				</CardContent>
			</Card>
    </div>
  );
}
