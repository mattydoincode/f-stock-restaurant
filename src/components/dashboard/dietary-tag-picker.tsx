"use client";

import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

const AVAILABLE_TAGS = [
	"Vegetarian",
	"Vegan",
	"Gluten-Free",
	"Dairy-Free",
	"Nut-Free",
	"Spicy",
	"Halal",
	"Kosher",
];

function normalizeTag(tag: string) {
	return tag.toLowerCase();
}

interface DietaryTagPickerProps {
	selected: string[];
	onChange: (tags: string[]) => void;
}

export function DietaryTagPicker({selected, onChange}: DietaryTagPickerProps) {
	const normalizedSelected = selected.map(normalizeTag);

	function toggle(tag: string) {
		const norm = normalizeTag(tag);
		if (normalizedSelected.includes(norm)) {
			onChange(selected.filter((t) => normalizeTag(t) !== norm));
		}
		else {
			onChange([...selected, norm]);
		}
	}

	return (
		<div className="flex flex-wrap gap-1.5">
			{AVAILABLE_TAGS.map((tag) => {
				const isSelected = normalizedSelected.includes(normalizeTag(tag));
				return (
					<Badge
						key={tag}
						variant={isSelected ? "default" : "outline"}
						className={cn(
							"cursor-pointer select-none transition-colors",
							!isSelected && "text-muted-foreground hover:text-foreground",
						)}
						onClick={() => toggle(tag)}
					>
						{tag}
					</Badge>
				);
			})}
		</div>
	);
}
