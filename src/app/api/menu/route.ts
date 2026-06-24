import {NextRequest, NextResponse} from "next/server";
import {NotFoundError} from "@/lib/errors";
import {errorResponse, parseIdParam} from "@/lib/api-utils";
import {getPrisma} from "@/lib/prisma";
import {createSection, deleteSection, getFullMenu, updateSection,} from "@/services/menu.service";
import type {SectionInput, SectionUpdate} from "@/types/menu";

async function getRestaurantId(): Promise<number> {
	const prisma = getPrisma();
	const restaurant = await prisma.restaurant.findFirst();
	if (!restaurant) {
		throw new NotFoundError("No restaurant found — create one first");
	}
	return restaurant.id;
}

export async function GET() {
	try {
		const restaurantId = await getRestaurantId();
		const menu = await getFullMenu(restaurantId);
		return NextResponse.json(menu);
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function POST(request: Request) {
	try {
		const restaurantId = await getRestaurantId();
		const body = (await request.json()) as SectionInput;
		const section = await createSection(restaurantId, body);
		return NextResponse.json(section, {status: 201});
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function PUT(request: Request) {
	try {
		await getRestaurantId();
		const body = (await request.json()) as SectionUpdate;
		const section = await updateSection(body);
		return NextResponse.json(section);
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		await getRestaurantId();
		const id = parseIdParam(request.nextUrl.searchParams.get("id"));
		if (!id) {
			return NextResponse.json({error: "Missing or invalid id parameter"}, {status: 400});
		}
		await deleteSection(id);
		return NextResponse.json({deleted: true});
	}
	catch (error) {
		return errorResponse(error);
	}
}
