import {NextResponse} from "next/server";
import {AppError} from "@/lib/errors";
import {createRestaurant, getRestaurant, updateRestaurant,} from "@/services/restaurant.service";
import type {RestaurantInput, RestaurantUpdate} from "@/types/restaurant";

function errorResponse(error: unknown): NextResponse {
	if (error instanceof AppError) {
		return NextResponse.json({error: error.message}, {status: error.statusCode});
	}
	console.error("Unexpected error:", error);
	return NextResponse.json({error: "Internal server error"}, {status: 500});
}

export async function GET() {
	try {
		const restaurant = await getRestaurant();
		return NextResponse.json(restaurant);
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as RestaurantInput;
		const restaurant = await createRestaurant(body);
		return NextResponse.json(restaurant, {status: 201});
	}
	catch (error) {
		return errorResponse(error);
	}
}

export async function PUT(request: Request) {
	try {
		const body = (await request.json()) as RestaurantUpdate;
		const restaurant = await updateRestaurant(body);
		return NextResponse.json(restaurant);
	}
	catch (error) {
		return errorResponse(error);
	}
}
