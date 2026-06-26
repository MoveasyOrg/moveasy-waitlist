#!/usr/bin/env node
/**
 * One-shot migration runner. Reads every .sql file in supabase/migrations
 * and executes it against SUPABASE_DB_URL.
 *
 * Usage: SUPABASE_DB_URL=postgres://... node scripts/migrate.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(here, "..", "supabase", "migrations");

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Missing SUPABASE_DB_URL");
  process.exit(1);
}

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
for (const f of files) {
  const sql = await readFile(path.join(migrationsDir, f), "utf8");
  console.log(`→ applying ${f}`);
  await client.query(sql);
}

console.log("✓ migrations applied");
await client.end();
