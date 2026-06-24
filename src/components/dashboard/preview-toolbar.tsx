"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowLeft, Check, Globe, GlobeLock, Share2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

interface PreviewToolbarProps {
	slug: string;
	initialPublished: boolean;
}

export function PreviewToolbar({slug, initialPublished}: PreviewToolbarProps) {
	const [published, setPublished] = useState(initialPublished);
	const [saving, setSaving] = useState(false);
	const [copied, setCopied] = useState(false);

	async function handleTogglePublish() {
		setSaving(true);
		try {
			const res = await fetch("/api/restaurant", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({published: !published}),
			});
			if (res.ok) {
				setPublished(!published);
			}
		}
		finally {
			setSaving(false);
		}
	}

	async function handleShare() {
		const url = `${window.location.origin}/s/${slug}`;
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<Link
				href="/dashboard"
				className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft className="h-4 w-4"/>
				Back to Dashboard
			</Link>

			<div className="flex items-center gap-3">
				<Badge variant={published ? "default" : "outline"}>
					{published ? (
						<>
							<Globe className="mr-1 h-3 w-3"/>
							Published
						</>
					) : (
						<>
							<GlobeLock className="mr-1 h-3 w-3"/>
							Draft
						</>
					)}
				</Badge>

				<Button
					variant={published ? "outline" : "default"}
					size="sm"
					onClick={handleTogglePublish}
					disabled={saving}
				>
					{saving ? "Saving..." : published ? "Unpublish" : "Publish"}
				</Button>

				{published && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleShare}
					>
						{copied ? (
							<>
								<Check className="mr-1 h-3.5 w-3.5"/>
								Copied!
							</>
						) : (
							<>
								<Share2 className="mr-1 h-3.5 w-3.5"/>
								Share
							</>
						)}
					</Button>
				)}
			</div>
		</div>
	);
}
