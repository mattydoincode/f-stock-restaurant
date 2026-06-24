import {COLOR_SCHEMES} from "@/types/theme";
import type {HoursEntry} from "@/types/restaurant";

export function formatPrice(price: number): string {
	return `$${price.toFixed(2)}`;
}

export function getColorSchemeVars(schemeId: string): React.CSSProperties {
	const scheme = COLOR_SCHEMES.find((s) => s.id === schemeId) ?? COLOR_SCHEMES[0];
	return {
		"--site-primary": scheme.primary,
		"--site-accent": scheme.accent,
	} as React.CSSProperties;
}

export function getDayLabel(day: string): string {
	return day.charAt(0).toUpperCase() + day.slice(1);
}

function formatTime(time24: string): string {
	const [h, m] = time24.split(":");
	const hour = parseInt(h, 10);
	const ampm = hour >= 12 ? "PM" : "AM";
	const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	return `${hour12}:${m} ${ampm}`;
}

export function formatHoursRange(entry: HoursEntry): string {
	return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

export const ORDERED_DAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
] as const;
