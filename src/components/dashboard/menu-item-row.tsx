"use client";

import {useState} from "react";
import {Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {ImageUpload} from "./image-upload";
import {DietaryTagPicker} from "./dietary-tag-picker";
import {ReorderButtons} from "./reorder-buttons";
import type {ItemUpdate, MenuItemResponse} from "@/types/menu";

interface MenuItemRowProps {
	item: MenuItemResponse;
	onUpdate: (data: ItemUpdate) => void;
	onDelete: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	isFirst: boolean;
	isLast: boolean;
}

export function MenuItemRow({
	                            item,
	                            onUpdate,
	                            onDelete,
	                            onMoveUp,
	                            onMoveDown,
	                            isFirst,
	                            isLast,
                            }: MenuItemRowProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="space-y-2 rounded-lg border p-3">
			<div className="flex items-start gap-2">
				<ReorderButtons
					onMoveUp={onMoveUp}
					onMoveDown={onMoveDown}
					isFirst={isFirst}
					isLast={isLast}
				/>

				<div className="flex-1 space-y-2">
					<div className="flex items-center gap-2">
						<Input
							className="flex-1"
							value={item.name}
							placeholder="Item name"
							onChange={(e) =>
								onUpdate({id: item.id, name: e.target.value})
							}
						/>
						<div className="flex items-center gap-1">
							<span className="text-sm text-muted-foreground">$</span>
							<Input
								className="w-20"
								type="number"
								step="0.01"
								min="0"
								value={item.price}
								onChange={(e) =>
									onUpdate({
										id: item.id,
										price: parseFloat(e.target.value) || 0,
									})
								}
							/>
						</div>
						<div className="flex items-center gap-1.5">
							<Label className="text-xs text-muted-foreground">Avail</Label>
							<Switch
								checked={item.available}
								onCheckedChange={(checked) =>
									onUpdate({id: item.id, available: checked})
								}
							/>
						</div>
					</div>

					{!expanded && (
						<button
							className="text-xs text-muted-foreground hover:text-foreground"
							onClick={() => setExpanded(true)}
						>
							{item.description ? item.description.slice(0, 60) + (item.description.length > 60 ? "..." : "") : "Add description, photo, tags..."}
						</button>
					)}

					{expanded && (
						<div className="space-y-3 pt-1">
							<Textarea
								value={item.description}
								placeholder="Item description"
								rows={2}
								onChange={(e) =>
									onUpdate({id: item.id, description: e.target.value})
								}
							/>

							<div className="flex items-start gap-4">
								<div className="space-y-1">
									<Label className="text-xs">Photo</Label>
									<ImageUpload
										compact
										currentImage={item.image || undefined}
										onUpload={(url) => onUpdate({id: item.id, image: url})}
										onRemove={() => onUpdate({id: item.id, image: ""})}
									/>
								</div>
							</div>

							<div className="space-y-1">
								<Label className="text-xs">Dietary Tags</Label>
								<DietaryTagPicker
									selected={item.dietaryTags}
									onChange={(tags) =>
										onUpdate({id: item.id, dietaryTags: tags})
									}
								/>
							</div>

							<button
								className="text-xs text-muted-foreground hover:text-foreground"
								onClick={() => setExpanded(false)}
							>
								Collapse
							</button>
						</div>
					)}
				</div>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
					onClick={onDelete}
					aria-label="Delete item"
				>
					<Trash2 className="h-4 w-4"/>
				</Button>
			</div>
		</div>
	);
}
