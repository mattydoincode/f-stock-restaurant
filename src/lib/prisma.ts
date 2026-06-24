import {PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";
import {PrismaClient} from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
	if (!globalForPrisma.__prisma) {
		const adapter = new PrismaBetterSqlite3({
			url: process.env.DATABASE_URL!,
		});
		globalForPrisma.__prisma = new PrismaClient({adapter});
	}
	return globalForPrisma.__prisma;
}
