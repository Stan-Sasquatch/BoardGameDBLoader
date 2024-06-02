import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
	dialect: "postgresql",
	schema: "./schema.ts",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
	tablesFilter: ["boardGameTracker*"],
});
