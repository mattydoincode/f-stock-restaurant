"use client";

import {useCallback} from "react";
import {useRestaurant} from "./use-restaurant";

export function useGallery() {
	const {
		restaurant,
		loading,
		saveImmediate,
		status,
		errorMessage,
		markSaving,
		markSaved,
		markError,
	} = useRestaurant();

	const heroImage = restaurant?.heroImage ?? "";
	const galleryImages = restaurant?.galleryImages ?? [];

	const uploadHero = useCallback(
		(url: string) => {
			saveImmediate({heroImage: url});
		},
		[saveImmediate],
	);

	const removeHero = useCallback(() => {
		saveImmediate({heroImage: ""});
	}, [saveImmediate]);

	const addGalleryImage = useCallback(
		(url: string) => {
			saveImmediate({galleryImages: [...galleryImages, url]});
		},
		[saveImmediate, galleryImages],
	);

	const removeGalleryImage = useCallback(
		(index: number) => {
			const updated = galleryImages.filter((_, i) => i !== index);
			saveImmediate({galleryImages: updated});
		},
		[saveImmediate, galleryImages],
	);

	const moveGalleryImageUp = useCallback(
		(index: number) => {
			if (index <= 0) return;
			const updated = [...galleryImages];
			[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
			saveImmediate({galleryImages: updated});
		},
		[saveImmediate, galleryImages],
	);

	const moveGalleryImageDown = useCallback(
		(index: number) => {
			if (index >= galleryImages.length - 1) return;
			const updated = [...galleryImages];
			[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
			saveImmediate({galleryImages: updated});
		},
		[saveImmediate, galleryImages],
	);

	return {
		heroImage,
		galleryImages,
		loading,
		uploadHero,
		removeHero,
		addGalleryImage,
		removeGalleryImage,
		moveGalleryImageUp,
		moveGalleryImageDown,
		status,
		errorMessage,
		markSaving,
		markSaved,
		markError,
	};
}
