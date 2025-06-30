import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida");
  }
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle({ client });
  console.log(db);
}

main();
