import type {TemplateProps} from "../types";
import {TrattoriaHero} from "./trattoria-hero";
import {TrattoriaAbout} from "./trattoria-about";
import {TrattoriaMenu} from "./trattoria-menu";
import {TrattoriaGallery} from "./trattoria-gallery";
import {TrattoriaHours} from "./trattoria-hours";
import {TrattoriaFooter} from "./trattoria-footer";

export function TrattoriaTemplate({restaurant, menu, colorVars}: TemplateProps) {
	return (
		<div style={colorVars} className="bg-amber-50 text-stone-800">
			<TrattoriaHero
				name={restaurant.name}
				cuisine={restaurant.cuisine}
				heroImage={restaurant.heroImage}
			/>
			<TrattoriaAbout description={restaurant.description}/>
			<TrattoriaMenu sections={menu}/>
			<TrattoriaGallery images={restaurant.galleryImages}/>
			<TrattoriaHours
				hours={restaurant.hours}
				address={restaurant.address}
				mapEmbed={restaurant.mapEmbed}
			/>
			<TrattoriaFooter
				name={restaurant.name}
				phone={restaurant.phone}
				email={restaurant.email}
				address={restaurant.address}
			/>
		</div>
	);
}
