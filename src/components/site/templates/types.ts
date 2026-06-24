import type {RestaurantResponse} from "@/types/restaurant";
import type {MenuSectionResponse} from "@/types/menu";

export interface TemplateProps {
	restaurant: RestaurantResponse;
	menu: MenuSectionResponse[];
	colorVars: React.CSSProperties;
}
