import { drizzle } from 'drizzle-orm/libsql';

export const drizzleClient = (url: string, authToken: string) => {
  const db = drizzle({
    connection: {
      url,
      authToken,
    }
  });

  return db
}
