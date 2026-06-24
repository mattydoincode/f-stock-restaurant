"use client";

import {Check} from "lucide-react";
import {cn} from "@/lib/utils";
import type {ColorSchemeOption} from "@/types/theme";

interface ColorPickerProps {
	schemes: ColorSchemeOption[];
	selected: string;
	onSelect: (id: string) => void;
}

export function ColorPicker({schemes, selected, onSelect}: ColorPickerProps) {
	return (
		<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
			{schemes.map((scheme) => {
				const isSelected = scheme.id === selected;
				return (
					<button
						key={scheme.id}
						className={cn(
							"group flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-primary/50",
							isSelected && "ring-2 ring-primary",
						)}
						onClick={() => onSelect(scheme.id)}
					>
						<div className="flex gap-1">
							<div
								className="h-8 w-8 rounded-full border"
								style={{backgroundColor: scheme.primary}}
							/>
							<div
								className="h-8 w-8 rounded-full border"
								style={{backgroundColor: scheme.accent}}
							/>
						</div>
						<span className="text-xs font-medium">{scheme.name}</span>
						{isSelected && (
							<Check className="h-3.5 w-3.5 text-primary"/>
						)}
					</button>
				);
			})}
		</div>
	);
}
