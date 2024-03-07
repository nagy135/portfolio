import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "~/env";
import * as schema from "./schema";

import BetterSqlite from "better-sqlite3";
import { Database } from "better-sqlite3";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Database | undefined;
};

export const conn =
  globalForDb.conn ?? new BetterSqlite(env.DATABASE_URL, { fileMustExist: false });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
