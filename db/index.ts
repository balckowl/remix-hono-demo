import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';

if (typeof process !== 'undefined' && process.env) {
  config({ path: '.env' });
}

const TURSO_CONNECTION_URL = typeof process !== 'undefined' && process.env
  ? process.env.TURSO_CONNECTION_URL
  : import.meta.env.TURSO_CONNECTION_URL;

const TURSO_AUTH_TOKEN = typeof process !== 'undefined' && process.env
  ? process.env.TURSO_AUTH_TOKEN
  : import.meta.env.TURSO_AUTH_TOKEN;

export const db = drizzle({ connection: {
  url: TURSO_CONNECTION_URL!,
  authToken: TURSO_AUTH_TOKEN!,
}});
