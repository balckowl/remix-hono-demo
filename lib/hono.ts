
import { hc } from "hono/client";
import { AppType } from "server";

export const hono = hc<AppType>(import.meta.env.VITE_API_URL);
