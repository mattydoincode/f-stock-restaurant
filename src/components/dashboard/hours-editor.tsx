"use client";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import type {HoursEntry, WeeklyHours} from "@/types/restaurant";

const DAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
] as const;

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

interface HoursEditorProps {
	hours: WeeklyHours;
	onChange: (hours: WeeklyHours) => void;
}

export function HoursEditor({hours, onChange}: HoursEditorProps) {
	function updateDay(day: string, entry: HoursEntry | null) {
		const updated = {...hours};
		if (entry) {
			updated[day] = entry;
		}
		else {
			delete updated[day];
		}
		onChange(updated);
	}

	return (
		<div className="space-y-3">
			{DAYS.map((day) => {
				const entry = hours[day];
				const isOpen = !!entry;

				return (
					<div key={day} className="flex items-center gap-4">
						<Label className="w-24 shrink-0 text-sm font-medium">
							{capitalize(day)}
						</Label>
						<Switch
							aria-label={`Toggle ${capitalize(day)}`}
							checked={isOpen}
							onCheckedChange={(checked) => {
								if (checked) {
									updateDay(day, {open: "09:00", close: "21:00"});
								}
								else {
									updateDay(day, null);
								}
							}}
						/>
						{isOpen ? (
							<div className="flex items-center gap-2">
								<Input
									type="time"
									className="w-32"
									value={entry.open}
									onChange={(e) =>
										updateDay(day, {...entry, open: e.target.value})
									}
								/>
								<span className="text-sm text-muted-foreground">to</span>
								<Input
									type="time"
									className="w-32"
									value={entry.close}
									onChange={(e) =>
										updateDay(day, {...entry, close: e.target.value})
									}
								/>
							</div>
						) : (
							<span className="text-sm text-muted-foreground">Closed</span>
						)}
					</div>
				);
			})}
		</div>
	);
}
