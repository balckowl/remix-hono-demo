import * as build from "../build/server";
import handle from "hono-remix-adapter/cloudflare-pages";
import hono from "../server";
export const onRequest = handle(build, hono);
