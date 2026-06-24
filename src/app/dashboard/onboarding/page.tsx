"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ThemeCard} from "@/components/dashboard/theme-card";
import {THEMES} from "@/types/theme";
import {ArrowLeft, ArrowRight, Loader2} from "lucide-react";

export default function OnboardingPage() {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const [name, setName] = useState("");
	const [cuisine, setCuisine] = useState("");
	const [description, setDescription] = useState("");
	const [theme, setTheme] = useState("bistro");

	async function handleFinish() {
		if (!name.trim()) return;
		setSaving(true);
		setError("");
		try {
			const res = await fetch("/api/restaurant", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					name: name.trim(),
					cuisine: cuisine.trim(),
					description: description.trim(),
					theme,
				}),
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Failed to create restaurant");
			}
			router.push("/dashboard");
		}
		catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
			setSaving(false);
		}
	}

	return (
		<div className="flex flex-1 items-center justify-center p-6">
			<div className="w-full max-w-lg space-y-6">
				{/* Progress indicator */}
				<div className="flex items-center justify-center gap-2">
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className={`h-2 w-12 rounded-full transition-colors ${
								i <= step ? "bg-primary" : "bg-muted"
							}`}
						/>
					))}
				</div>

				{/* Step 1: Name & Cuisine */}
				{step === 0 && (
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">Welcome to Goethena</CardTitle>
							<CardDescription>
								Let&apos;s set up your restaurant website. What&apos;s your restaurant called?
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Restaurant Name</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="e.g. Bella Cucina"
									autoFocus
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cuisine">Cuisine Type</Label>
								<Input
									id="cuisine"
									value={cuisine}
									onChange={(e) => setCuisine(e.target.value)}
									placeholder="e.g. Italian, Mexican, Japanese"
								/>
							</div>
							<div className="flex justify-end">
								<Button onClick={() => setStep(1)} disabled={!name.trim()}>
									Next
									<ArrowRight className="ml-1 h-4 w-4"/>
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Step 2: Description */}
				{step === 1 && (
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">Tell your story</CardTitle>
							<CardDescription>
								A short description helps diners understand what makes your restaurant special.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="description">Description (optional)</Label>
								<Textarea
									id="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="We're a family-owned restaurant serving..."
									rows={4}
								/>
							</div>
							<div className="flex justify-between">
								<Button variant="outline" onClick={() => setStep(0)}>
									<ArrowLeft className="mr-1 h-4 w-4"/>
									Back
								</Button>
								<Button onClick={() => setStep(2)}>
									{description.trim() ? "Next" : "Skip"}
									<ArrowRight className="ml-1 h-4 w-4"/>
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Step 3: Theme Selection */}
				{step === 2 && (
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">Pick a theme</CardTitle>
							<CardDescription>
								Choose a design template for your website. You can change this later.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-3">
								{THEMES.map((t) => (
									<ThemeCard
										key={t.id}
										theme={t}
										selected={theme === t.id}
										onSelect={() => setTheme(t.id)}
									/>
								))}
							</div>

							{error && (
								<p className="text-sm text-destructive">{error}</p>
							)}

							<div className="flex justify-between">
								<Button variant="outline" onClick={() => setStep(1)}>
									<ArrowLeft className="mr-1 h-4 w-4"/>
									Back
								</Button>
								<Button onClick={handleFinish} disabled={saving}>
									{saving ? (
										<>
											<Loader2 className="mr-1 h-4 w-4 animate-spin"/>
											Creating...
										</>
									) : (
										"Create My Website"
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
