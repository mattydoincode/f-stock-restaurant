"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle} from "lucide-react";

export default function DashboardError({
	                                       error,
	                                       reset,
                                       }: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-1 items-center justify-center p-6">
			<Card className="max-w-md">
				<CardHeader className="items-center text-center">
					<AlertCircle className="mb-2 h-12 w-12 text-destructive/60"/>
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>
						{error.message || "An unexpected error occurred. Please try again."}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center">
					<Button onClick={reset}>Try Again</Button>
				</CardContent>
			</Card>
		</div>
	);
}
