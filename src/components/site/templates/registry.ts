import type {ComponentType} from "react";
import type {TemplateProps} from "./types";
import {BistroTemplate} from "./bistro/bistro-template";
import {FreshTemplate} from "./fresh/fresh-template";
import {TrattoriaTemplate} from "./trattoria/trattoria-template";

const TEMPLATE_REGISTRY: Record<string, ComponentType<TemplateProps>> = {
	bistro: BistroTemplate,
	fresh: FreshTemplate,
	trattoria: TrattoriaTemplate,
};

export function getTemplate(themeId: string): ComponentType<TemplateProps> {
	return TEMPLATE_REGISTRY[themeId] ?? TEMPLATE_REGISTRY.bistro;
}
