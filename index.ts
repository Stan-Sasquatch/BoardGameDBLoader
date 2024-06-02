import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { boardGame } from "./schema";

async function test(): Promise<void> {
	const connectionString = process.env.DATABASE_URL!;
	const client = postgres(connectionString);
	const db = drizzle(client);
	const allBoardGames = await db.select().from(boardGame);

	console.log(allBoardGames);
}

test();
