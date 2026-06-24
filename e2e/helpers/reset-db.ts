import Database from "better-sqlite3";
import path from "path";

function getDbPath(): string {
	const dbUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
	// DATABASE_URL format is "file:./prisma/dev.db" — strip the "file:" prefix
	const relativePath = dbUrl.replace(/^file:/, "");
	return path.resolve(process.cwd(), relativePath);
}

export function getTestDb(): Database.Database {
	return new Database(getDbPath());
}

export function resetDatabase(): void {
	const db = getTestDb();
	db.exec("DELETE FROM MenuItem");
	db.exec("DELETE FROM MenuSection");
	db.exec("DELETE FROM Restaurant");
	db.close();
}
