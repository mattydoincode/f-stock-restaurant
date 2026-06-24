"use client";

import {useCallback, useEffect, useState} from "react";
import {useSaveIndicator} from "./use-save-indicator";
import type {ItemInput, ItemUpdate, MenuItemResponse, MenuSectionResponse, SectionInput, SectionUpdate,} from "@/types/menu";

export function useMenu() {
	const [sections, setSections] = useState<MenuSectionResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const saveIndicator = useSaveIndicator();

	const fetchMenu = useCallback(async () => {
		try {
			const res = await fetch("/api/menu");
			if (res.ok) setSections(await res.json());
		}
		finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchMenu();
	}, [fetchMenu]);

	// --- Section CRUD ---

	const addSection = useCallback(
		async (data: SectionInput) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch("/api/menu", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(data),
				});
				if (!res.ok) throw new Error((await res.json()).error);
				const section: MenuSectionResponse = await res.json();
				setSections((prev) => [...prev, section]);
				saveIndicator.markSaved();
				return section;
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to add section");
				return null;
			}
		},
		[saveIndicator],
	);

	const updateSection = useCallback(
		async (data: SectionUpdate) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch("/api/menu", {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(data),
				});
				if (!res.ok) throw new Error((await res.json()).error);
				const updated: MenuSectionResponse = await res.json();
				setSections((prev) =>
					prev.map((s) => (s.id === updated.id ? updated : s)),
				);
				saveIndicator.markSaved();
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to update section");
			}
		},
		[saveIndicator],
	);

	const deleteSection = useCallback(
		async (sectionId: number) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch(`/api/menu?id=${sectionId}`, {method: "DELETE"});
				if (!res.ok) throw new Error((await res.json()).error);
				setSections((prev) => prev.filter((s) => s.id !== sectionId));
				saveIndicator.markSaved();
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to delete section");
			}
		},
		[saveIndicator],
	);

	// --- Item CRUD ---

	const addItem = useCallback(
		async (data: ItemInput) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch("/api/menu/items", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(data),
				});
				if (!res.ok) throw new Error((await res.json()).error);
				const item: MenuItemResponse = await res.json();
				setSections((prev) =>
					prev.map((s) =>
						s.id === data.sectionId ? {...s, items: [...s.items, item]} : s,
					),
				);
				saveIndicator.markSaved();
				return item;
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to add item");
				return null;
			}
		},
		[saveIndicator],
	);

	const updateItem = useCallback(
		async (sectionId: number, data: ItemUpdate) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch("/api/menu/items", {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(data),
				});
				if (!res.ok) throw new Error((await res.json()).error);
				const updated: MenuItemResponse = await res.json();
				setSections((prev) =>
					prev.map((s) =>
						s.id === sectionId
							? {...s, items: s.items.map((i) => (i.id === updated.id ? updated : i))}
							: s,
					),
				);
				saveIndicator.markSaved();
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to update item");
			}
		},
		[saveIndicator],
	);

	const deleteItem = useCallback(
		async (sectionId: number, itemId: number) => {
			saveIndicator.markSaving();
			try {
				const res = await fetch(`/api/menu/items?id=${itemId}`, {method: "DELETE"});
				if (!res.ok) throw new Error((await res.json()).error);
				setSections((prev) =>
					prev.map((s) =>
						s.id === sectionId
							? {...s, items: s.items.filter((i) => i.id !== itemId)}
							: s,
					),
				);
				saveIndicator.markSaved();
			}
			catch (err) {
				saveIndicator.markError(err instanceof Error ? err.message : "Failed to delete item");
			}
		},
		[saveIndicator],
	);

	// --- Reorder ---

	const moveSectionUp = useCallback(
		async (sectionId: number) => {
			const idx = sections.findIndex((s) => s.id === sectionId);
			if (idx <= 0) return;
			const current = sections[idx];
			const above = sections[idx - 1];
			// Swap sortOrder values
			await Promise.all([
				updateSection({id: current.id, sortOrder: above.sortOrder}),
				updateSection({id: above.id, sortOrder: current.sortOrder}),
			]);
			await fetchMenu();
		},
		[sections, updateSection, fetchMenu],
	);

	const moveSectionDown = useCallback(
		async (sectionId: number) => {
			const idx = sections.findIndex((s) => s.id === sectionId);
			if (idx < 0 || idx >= sections.length - 1) return;
			const current = sections[idx];
			const below = sections[idx + 1];
			await Promise.all([
				updateSection({id: current.id, sortOrder: below.sortOrder}),
				updateSection({id: below.id, sortOrder: current.sortOrder}),
			]);
			await fetchMenu();
		},
		[sections, updateSection, fetchMenu],
	);

	const moveItemUp = useCallback(
		async (sectionId: number, itemId: number) => {
			const section = sections.find((s) => s.id === sectionId);
			if (!section) return;
			const idx = section.items.findIndex((i) => i.id === itemId);
			if (idx <= 0) return;
			const current = section.items[idx];
			const above = section.items[idx - 1];
			await Promise.all([
				updateItem(sectionId, {id: current.id, sortOrder: above.sortOrder}),
				updateItem(sectionId, {id: above.id, sortOrder: current.sortOrder}),
			]);
			await fetchMenu();
		},
		[sections, updateItem, fetchMenu],
	);

	const moveItemDown = useCallback(
		async (sectionId: number, itemId: number) => {
			const section = sections.find((s) => s.id === sectionId);
			if (!section) return;
			const idx = section.items.findIndex((i) => i.id === itemId);
			if (idx < 0 || idx >= section.items.length - 1) return;
			const current = section.items[idx];
			const below = section.items[idx + 1];
			await Promise.all([
				updateItem(sectionId, {id: current.id, sortOrder: below.sortOrder}),
				updateItem(sectionId, {id: below.id, sortOrder: current.sortOrder}),
			]);
			await fetchMenu();
		},
		[sections, updateItem, fetchMenu],
	);

	return {
		sections,
		loading,
		addSection,
		updateSection,
		deleteSection,
		addItem,
		updateItem,
		deleteItem,
		moveSectionUp,
		moveSectionDown,
		moveItemUp,
		moveItemDown,
		...saveIndicator,
	};
}
