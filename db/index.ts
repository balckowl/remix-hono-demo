import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
config({ path: '.env' });

export const drizzleClient = (url: string, authToken: string) => {
  const db = drizzle({
    connection: {
      url,
      authToken,
    }
  });

  return db
}
