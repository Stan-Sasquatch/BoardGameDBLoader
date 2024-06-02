import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { boardGame } from "./schema";
import "./drizzle/envConfig";

async function test(): Promise<void> {
	const db = drizzle(sql);
	const allBoardGames = await db.select().from(boardGame);

	console.log(allBoardGames);
}

test();
