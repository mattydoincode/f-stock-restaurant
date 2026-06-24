"use client";

import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ReorderButtonsProps {
	onMoveUp: () => void;
	onMoveDown: () => void;
	isFirst: boolean;
	isLast: boolean;
}

export function ReorderButtons({
	                               onMoveUp,
	                               onMoveDown,
	                               isFirst,
	                               isLast,
                               }: ReorderButtonsProps) {
	return (
		<div className="flex flex-col gap-0.5">
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="h-6 w-6"
				disabled={isFirst}
				onClick={onMoveUp}
				aria-label="Move up"
			>
				<ChevronUp className="h-3.5 w-3.5"/>
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="h-6 w-6"
				disabled={isLast}
				onClick={onMoveDown}
				aria-label="Move down"
			>
				<ChevronDown className="h-3.5 w-3.5"/>
			</Button>
		</div>
	);
}
