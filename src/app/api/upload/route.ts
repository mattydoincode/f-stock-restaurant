import {NextResponse} from "next/server";
import {errorResponse} from "@/lib/api-utils";
import {saveUploadedFile} from "@/services/upload.service";

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
