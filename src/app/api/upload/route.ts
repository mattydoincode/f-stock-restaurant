import {NextResponse} from "next/server";
import {AppError} from "@/lib/errors";
import {saveUploadedFile} from "@/services/upload.service";

function errorResponse(error: unknown): NextResponse {
	if (error instanceof AppError) {
		return NextResponse.json({error: error.message}, {status: error.statusCode});
	}
	console.error("Unexpected error:", error);
	return NextResponse.json({error: "Internal server error"}, {status: 500});
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file || !(file instanceof File)) {
			return NextResponse.json(
				{error: "Missing file field in form data"},
				{status: 400},
			);
		}

		const url = await saveUploadedFile(file);
		return NextResponse.json({url}, {status: 201});
	}
	catch (error) {
		return errorResponse(error);
	}
}
