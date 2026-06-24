"use client";

import {useRef, useState} from "react";
import {Loader2, Upload, X} from "lucide-react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface ImageUploadProps {
	currentImage?: string;
	onUpload: (url: string) => void;
	onRemove?: () => void;
	label?: string;
	className?: string;
	compact?: boolean;
}

export function ImageUpload({
	                            currentImage,
	                            onUpload,
	                            onRemove,
	                            label = "Upload image",
	                            className,
	                            compact = false,
                            }: ImageUploadProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploading, setUploading] = useState(false);

	async function handleFile(file: File) {
		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await fetch("/api/upload", {method: "POST", body: formData});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Upload failed");
			}
			const {url} = await res.json();
			onUpload(url);
		}
		catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		}
		finally {
			setUploading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
		e.target.value = "";
	}

	if (compact) {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				{currentImage ? (
					<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border">
						<img src={currentImage} alt="" className="h-full w-full object-cover"/>
						{onRemove && (
							<button
								onClick={onRemove}
								className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-destructive-foreground"
							>
								<X className="h-3 w-3"/>
							</button>
						)}
					</div>
				) : null}
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={uploading}
					onClick={() => inputRef.current?.click()}
				>
					{uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin"/> : <Upload className="h-3.5 w-3.5"/>}
				</Button>
				<input
					ref={inputRef}
					type="file"
					accept="image/jpeg,image/png,image/webp,image/gif"
					className="hidden"
					onChange={handleChange}
				/>
			</div>
		);
	}

	return (
		<div className={cn("space-y-2", className)}>
			<div
				className={cn(
					"relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary/50",
					currentImage ? "border-muted" : "border-muted-foreground/25",
				)}
				onClick={() => !uploading && inputRef.current?.click()}
			>
				{uploading ? (
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
				) : currentImage ? (
					<div className="relative">
						<img
							src={currentImage}
							alt=""
							className="max-h-48 rounded object-contain"
						/>
						{onRemove && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									onRemove();
								}}
								className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
							>
								<X className="h-4 w-4"/>
							</button>
						)}
					</div>
				) : (
					<>
						<Upload className="mb-2 h-8 w-8 text-muted-foreground"/>
						<span className="text-sm text-muted-foreground">{label}</span>
					</>
				)}
			</div>
			<input
				ref={inputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif"
				className="hidden"
				onChange={handleChange}
			/>
		</div>
	);
}
