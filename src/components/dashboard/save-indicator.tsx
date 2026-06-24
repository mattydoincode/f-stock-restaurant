"use client";

import {AlertCircle, Check, Loader2} from "lucide-react";
import type {SaveStatus} from "@/hooks/use-save-indicator";

interface SaveIndicatorProps {
	status: SaveStatus;
	errorMessage?: string;
}

export function SaveIndicator({status, errorMessage}: SaveIndicatorProps) {
	if (status === "idle") return null;

	return (
		<div className="flex items-center gap-1.5 text-sm">
			{status === "saving" && (
				<>
					<Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground"/>
					<span className="text-muted-foreground">Saving...</span>
				</>
			)}
			{status === "saved" && (
				<>
					<Check className="h-3.5 w-3.5 text-green-600"/>
					<span className="text-green-600">Saved</span>
				</>
			)}
			{status === "error" && (
				<>
					<AlertCircle className="h-3.5 w-3.5 text-destructive"/>
					<span className="text-destructive">{errorMessage || "Save failed"}</span>
				</>
			)}
		</div>
	);
}
