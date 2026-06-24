"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {useSaveIndicator} from "./use-save-indicator";
import type {RestaurantResponse, RestaurantUpdate} from "@/types/restaurant";

export function useRestaurant() {
	const [restaurant, setRestaurant] = useState<RestaurantResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const saveIndicator = useSaveIndicator();
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingUpdates = useRef<RestaurantUpdate>({});

	useEffect(() => {
		fetch("/api/restaurant")
			.then(async (res) => {
				if (res.ok) setRestaurant(await res.json());
			})
			.finally(() => setLoading(false));
	}, []);

	const saveToApi = useCallback(
		async (data: RestaurantUpdate) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch("/api/restaurant", {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(data),
				});
				if (!res.ok) {
					const err = await res.json();
					throw new Error(err.error || "Save failed");
				}
				const updated: RestaurantResponse = await res.json();
				setRestaurant(updated);
				saveIndicator.markSaved();
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Save failed");
			}
		},
		[saveIndicator],
	);

	const flushSave = useCallback(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			debounceRef.current = null;
		}
		const updates = {...pendingUpdates.current};
		pendingUpdates.current = {};
		if (Object.keys(updates).length > 0) {
			saveToApi(updates);
		}
	}, [saveToApi]);

	// Flush pending saves when the component unmounts (e.g. user navigates away)
	const flushRef = useRef(flushSave);
	flushRef.current = flushSave;
	useEffect(() => () => flushRef.current(), []);

	const updateField = useCallback(
		<K extends keyof RestaurantUpdate>(field: K, value: RestaurantUpdate[K]) => {
			// Optimistically update local state
			setRestaurant((prev) =>
				prev ? {...prev, [field]: value} : prev,
			);

			// Accumulate pending updates and debounce
			pendingUpdates.current[field] = value;
			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				const updates = {...pendingUpdates.current};
				pendingUpdates.current = {};
				debounceRef.current = null;
				saveToApi(updates);
			}, 1500);
		},
		[saveToApi],
	);

	const saveImmediate = useCallback(
		async (data: RestaurantUpdate) => {
			// Clear any pending debounced save
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
				debounceRef.current = null;
			}
			// Merge pending updates with the immediate data
			const merged = {...pendingUpdates.current, ...data};
			pendingUpdates.current = {};

			setRestaurant((prev) =>
				prev ? {...prev, ...merged} : prev,
			);
			await saveToApi(merged);
		},
		[saveToApi],
	);

	return {
		restaurant,
		loading,
		updateField,
		saveImmediate,
		flushSave,
		...saveIndicator,
	};
}
