import type {TemplateProps} from "../types";
import {FreshHero} from "./fresh-hero";
import {FreshAbout} from "./fresh-about";
import {FreshMenu} from "./fresh-menu";
import {FreshGallery} from "./fresh-gallery";
import {FreshHours} from "./fresh-hours";
import {FreshFooter} from "./fresh-footer";

export function FreshTemplate({restaurant, menu, colorVars}: TemplateProps) {
	return (
		<div style={colorVars} className="bg-white text-gray-900">
			<FreshHero
				name={restaurant.name}
				cuisine={restaurant.cuisine}
				heroImage={restaurant.heroImage}
			/>
			<FreshAbout description={restaurant.description}/>
			<FreshMenu sections={menu}/>
			<FreshGallery images={restaurant.galleryImages}/>
			<FreshHours
				hours={restaurant.hours}
				address={restaurant.address}
				mapEmbed={restaurant.mapEmbed}
			/>
			<FreshFooter
				name={restaurant.name}
				phone={restaurant.phone}
				email={restaurant.email}
			/>
		</div>
	);
}
