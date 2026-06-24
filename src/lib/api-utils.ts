import {NextResponse} from "next/server";
import {AppError} from "@/lib/errors";

export function errorResponse(error: unknown): NextResponse {
	if (error instanceof AppError) {
		return NextResponse.json({error: error.message}, {status: error.statusCode});
	}
	console.error("Unexpected error:", error);
	return NextResponse.json({error: "Internal server error"}, {status: 500});
}

export function parseIdParam(value: string | null): number | null {
	if (!value) return null;
	const id = parseInt(value, 10);
	if (Number.isNaN(id) || id <= 0) return null;
	return id;
}
