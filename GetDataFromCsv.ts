import { z } from "zod";
import csvParser from "csv-parser";
import * as fs from "fs";

const BoardGameSchema = z.object({
	objectid: z.string(),
	name: z.string(),
	yearpublished: z.string(),
});

type BoardGame = z.infer<typeof BoardGameSchema>;

export async function GetDataFromCsv(): Promise<BoardGame[]> {
	return new Promise((resolve, reject) => {
		const results: BoardGame[] = [];

		fs.createReadStream("boardgames1.csv")
			.pipe(csvParser())
			.on("data", (data: unknown) => {
				try {
					const parsedData = BoardGameSchema.parse(data);
					results.push(parsedData);
					console.log(results.length);
				} catch (error) {
					console.error("Error parsing data:", error);
					reject(error);
				}
			})
			.on("end", () => {
				console.log("ended");
				resolve(results);
			})
			.on("error", (error) => {
				console.error("Error reading file:", error);
				reject(error);
			});
	});
}
