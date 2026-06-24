import {mkdir, writeFile} from "node:fs/promises";
import {join} from "node:path";
import {randomUUID} from "node:crypto";
import {ValidationError} from "@/lib/errors";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(file: File): Promise<string> {
	if (!ALLOWED_TYPES.has(file.type)) {
		throw new ValidationError(
			`Invalid file type: ${file.type}. Allowed: ${[...ALLOWED_TYPES].join(", ")}`,
		);
	}

	if (file.size > MAX_SIZE) {
		throw new ValidationError(`File too large: ${file.size} bytes. Maximum: ${MAX_SIZE} bytes`);
	}

	const ext = file.name.split(".").pop() ?? "bin";
	const filename = `${randomUUID()}.${ext}`;

	await mkdir(UPLOAD_DIR, {recursive: true});

	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(join(UPLOAD_DIR, filename), buffer);

	return `/uploads/${filename}`;
}
