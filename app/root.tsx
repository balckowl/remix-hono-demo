import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { auth as authClient } from "lib/auth";

import "./tailwind.css";
import Header from "components/header";
import { Session } from "better-auth";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { env } = context.cloudflare

  const auth = authClient(
    env.TURSO_CONNECTION_URL,
    env.TURSO_AUTH_TOKEN,
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET
  )

  const session = auth.api.getSession({
    headers: request.headers,
  });

  return session
}

export function Layout({ children }: { children: React.ReactNode }) {
  const session = useLoaderData<Session | null>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header session={session}/>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
