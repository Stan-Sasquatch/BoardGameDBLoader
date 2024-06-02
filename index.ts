import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { boardGame } from "./schema";
import "./drizzle/envConfig";
import { GetDataFromCsv } from "./GetDataFromCsv";
import { InferInsertModel } from "drizzle-orm";
const db = drizzle(sql);

async function GetAllBoardGames(): Promise<void> {
	const allBoardGames = await db.select().from(boardGame);

	console.log(allBoardGames);
}

async function InsertBoardGames(games: InferInsertModel<typeof boardGame>[]) {
	await db.insert(boardGame).values(games).onConflictDoNothing();
}

GetDataFromCsv().then((data) => {
	const mappedData = data.map((x) => ({
		name: x.name,
		id: parseInt(x.objectid),
		yearPublished: parseInt(x.yearpublished),
	}));

	console.log(`Got mapped data length ${mappedData.length}`);

	InsertBoardGames(mappedData);
});
