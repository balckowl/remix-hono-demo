import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema"
import { drizzleClient } from "db";

export const auth = (url: string, authToken: string, clientId: string, clientSecret: string) => {

  const db = drizzleClient(url, authToken)

  const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: { ...schema },
    }),
    socialProviders: {
      github: {
        clientId,
        clientSecret,
      }
    }
  })

  return auth;
}


