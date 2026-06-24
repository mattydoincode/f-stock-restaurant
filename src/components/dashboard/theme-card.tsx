"use client";

import {Check} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import type {ThemeOption} from "@/types/theme";

interface ThemeCardProps {
	theme: ThemeOption;
	selected: boolean;
	onSelect: () => void;
}

export function ThemeCard({theme, selected, onSelect}: ThemeCardProps) {
	return (
		<Card
			className={cn(
				"cursor-pointer transition-all hover:border-primary/50",
				selected && "ring-2 ring-primary",
			)}
			onClick={onSelect}
		>
			<CardHeader>
				<CardTitle className="flex items-center justify-between text-base">
					{theme.name}
					{selected && <Check className="h-5 w-5 text-primary"/>}
				</CardTitle>
				<CardDescription>{theme.description}</CardDescription>
			</CardHeader>
		</Card>
	);
}
