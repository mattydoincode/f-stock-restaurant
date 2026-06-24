import {NextRequest, NextResponse} from "next/server";
import {AppError} from "@/lib/errors";
import {createItem, deleteItem, updateItem} from "@/services/menu.service";
import type {ItemInput, ItemUpdate} from "@/types/menu";

function errorResponse(error: unknown): NextResponse {
	if (error instanceof AppError) {
		return NextResponse.json({error: error.message}, {status: error.statusCode});
	}
	console.error("Unexpected error:", error);
	return NextResponse.json({error: "Internal server error"}, {status: 500});
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ItemInput;
		const item = await createItem(body);
		return NextResponse.json(item, {status: 201});
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function PUT(request: Request) {
	try {
		const body = (await request.json()) as ItemUpdate;
		const item = await updateItem(body);
		return NextResponse.json(item);
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const id = Number(request.nextUrl.searchParams.get("id"));
		if (!id) {
			return NextResponse.json({error: "Missing id parameter"}, {status: 400});
		}
		await deleteItem(id);
		return NextResponse.json({deleted: true});
	}
	catch (error) {
		return errorResponse(error);
	}
}
