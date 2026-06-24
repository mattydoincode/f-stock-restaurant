"use client";

import {useState} from "react";
import {Plus, Trash2} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Separator} from "@/components/ui/separator";
import {ReorderButtons} from "./reorder-buttons";
import {MenuItemRow} from "./menu-item-row";
import type {ItemInput, ItemUpdate, MenuSectionResponse, SectionUpdate,} from "@/types/menu";

interface SectionCardProps {
	section: MenuSectionResponse;
	onUpdateSection: (data: SectionUpdate) => void;
	onDeleteSection: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	isFirst: boolean;
	isLast: boolean;
	onAddItem: (data: ItemInput) => void;
	onUpdateItem: (data: ItemUpdate) => void;
	onDeleteItem: (itemId: number) => void;
	onMoveItemUp: (itemId: number) => void;
	onMoveItemDown: (itemId: number) => void;
}

export function SectionCard({
	                            section,
	                            onUpdateSection,
	                            onDeleteSection,
	                            onMoveUp,
	                            onMoveDown,
	                            isFirst,
	                            isLast,
	                            onAddItem,
	                            onUpdateItem,
	                            onDeleteItem,
	                            onMoveItemUp,
	                            onMoveItemDown,
                            }: SectionCardProps) {
	const [editingName, setEditingName] = useState(false);
	const [nameValue, setNameValue] = useState(section.name);
	const [newItemName, setNewItemName] = useState("");
	const [newItemPrice, setNewItemPrice] = useState("");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	function handleNameBlur() {
		setEditingName(false);
		if (nameValue.trim() && nameValue !== section.name) {
			onUpdateSection({id: section.id, name: nameValue.trim()});
		}
		else {
			setNameValue(section.name);
		}
	}

	function handleAddItem() {
		if (!newItemName.trim()) return;
		onAddItem({
			sectionId: section.id,
			name: newItemName.trim(),
			price: parseFloat(newItemPrice) || 0,
		});
		setNewItemName("");
		setNewItemPrice("");
	}

	return (
		<Card>
			<CardHeader className="flex-row items-center gap-2 space-y-0">
				<ReorderButtons
					onMoveUp={onMoveUp}
					onMoveDown={onMoveDown}
					isFirst={isFirst}
					isLast={isLast}
				/>
				<div className="flex-1">
					{editingName ? (
						<Input
							autoFocus
							value={nameValue}
							onChange={(e) => setNameValue(e.target.value)}
							onBlur={handleNameBlur}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleNameBlur();
								if (e.key === "Escape") {
									setNameValue(section.name);
									setEditingName(false);
								}
							}}
						/>
					) : (
						<CardTitle
							className="cursor-pointer text-lg hover:text-primary"
							onClick={() => setEditingName(true)}
						>
							{section.name}
						</CardTitle>
					)}
					{section.description && (
						<p className="mt-1 text-sm text-muted-foreground">
							{section.description}
						</p>
					)}
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-muted-foreground hover:text-destructive"
					onClick={() => setDeleteDialogOpen(true)}
					aria-label="Delete section"
				>
					<Trash2 className="h-4 w-4"/>
				</Button>
				<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Delete Section</DialogTitle>
							<DialogDescription>
								Delete &quot;{section.name}&quot; and all its{" "}
								{section.items.length} item{section.items.length !== 1 ? "s" : ""}?
								This cannot be undone.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={() => {
									setDeleteDialogOpen(false);
									onDeleteSection();
								}}
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardHeader>

			<CardContent className="space-y-3">
				{section.items.map((item, idx) => (
					<MenuItemRow
						key={item.id}
						item={item}
						onUpdate={onUpdateItem}
						onDelete={() => onDeleteItem(item.id)}
						onMoveUp={() => onMoveItemUp(item.id)}
						onMoveDown={() => onMoveItemDown(item.id)}
						isFirst={idx === 0}
						isLast={idx === section.items.length - 1}
					/>
				))}

				{section.items.length === 0 && (
					<p className="py-4 text-center text-sm text-muted-foreground">
						No items yet. Add your first item below.
					</p>
				)}

				<Separator/>

				<div className="flex items-center gap-2">
					<Input
						className="flex-1"
						placeholder="New item name"
						value={newItemName}
						onChange={(e) => setNewItemName(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleAddItem();
						}}
					/>
					<div className="flex items-center gap-1">
						<span className="text-sm text-muted-foreground">$</span>
						<Input
							className="w-20"
							type="number"
							step="0.01"
							min="0"
							placeholder="0.00"
							value={newItemPrice}
							onChange={(e) => setNewItemPrice(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleAddItem();
							}}
						/>
					</div>
					<Button type="button" size="sm" onClick={handleAddItem} disabled={!newItemName.trim()}>
						<Plus className="mr-1 h-4 w-4"/>
						Add
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
