import handle from "hono-remix-adapter/cloudflare-pages";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - the server build file is generated by `remix vite:build`
// eslint-disable-next-line import/no-unresolved
import * as build from "../build/server";
import hono from "../server";

export const onRequest = handle(build, hono);
