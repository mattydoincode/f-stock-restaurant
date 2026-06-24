export interface ThemeOption {
	id: string;
	name: string;
	description: string;
}

export interface ColorSchemeOption {
	id: string;
	name: string;
	primary: string;
	accent: string;
}

export const THEMES: ThemeOption[] = [
	{
		id: "bistro",
		name: "Bistro",
		description: "Warm and elegant — dark backgrounds, serif fonts, large food photos. Suited for fine dining.",
	},
	{
		id: "fresh",
		name: "Fresh",
		description: "Bright and modern — white space, sans-serif, grid layout. Suited for casual and fast-casual.",
	},
	{
		id: "trattoria",
		name: "Trattoria",
		description: "Rustic and cozy — earth tones, textured backgrounds, handwritten accents. Suited for family restaurants.",
	},
];

export const COLOR_SCHEMES: ColorSchemeOption[] = [
	{id: "default", name: "Classic", primary: "#1a1a1a", accent: "#b91c1c"},
	{id: "warm", name: "Warm", primary: "#78350f", accent: "#d97706"},
	{id: "ocean", name: "Ocean", primary: "#0c4a6e", accent: "#0ea5e9"},
	{id: "forest", name: "Forest", primary: "#14532d", accent: "#22c55e"},
	{id: "plum", name: "Plum", primary: "#581c87", accent: "#a855f7"},
	{id: "slate", name: "Slate", primary: "#334155", accent: "#64748b"},
];
