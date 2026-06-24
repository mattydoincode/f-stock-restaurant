import type {TemplateProps} from "../types";
import {BistroHero} from "./bistro-hero";
import {BistroAbout} from "./bistro-about";
import {BistroMenu} from "./bistro-menu";
import {BistroGallery} from "./bistro-gallery";
import {BistroHours} from "./bistro-hours";
import {BistroFooter} from "./bistro-footer";

export function BistroTemplate({restaurant, menu, colorVars}: TemplateProps) {
	return (
		<div style={colorVars} className="bg-neutral-950 text-white">
			<BistroHero
				name={restaurant.name}
				cuisine={restaurant.cuisine}
				heroImage={restaurant.heroImage}
			/>
			<BistroAbout description={restaurant.description}/>
			<BistroMenu sections={menu}/>
			<BistroGallery images={restaurant.galleryImages}/>
			<BistroHours
				hours={restaurant.hours}
				address={restaurant.address}
				mapEmbed={restaurant.mapEmbed}
			/>
			<BistroFooter
				name={restaurant.name}
				phone={restaurant.phone}
				email={restaurant.email}
				address={restaurant.address}
			/>
		</div>
	);
}
