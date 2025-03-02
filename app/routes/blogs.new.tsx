import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { Session } from "better-auth";
import { auth as authClient } from "lib/auth";
import { hono } from "lib/hono";

export async function loader({ request, context }: LoaderFunctionArgs) {
    const { env } = context.cloudflare

    const auth = authClient(
        env.TURSO_CONNECTION_URL,
        env.TURSO_AUTH_TOKEN,
        env.GITHUB_CLIENT_ID,
        env.GITHUB_CLIENT_SECRET
    )

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    return session
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const headers = {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
    };

    await hono.api.blogs.$post({
        json: {
            title,
            content
        },
    }, {
        init: {
            headers,
        }
    })

    return json({})
}

export default function New() {
    const session = useLoaderData<Session | null>();

    if (!session) {
        return <p>認証してください。</p>
    }

    return (
        <div>
            <h1 className="font-bold text-3xl">投稿作成</h1>
            <Form method="post">
                <input type="text" name="title" className="border-2 block" />
                <textarea name="content" className="border-2 block" />
                <button type="submit" className="border-2 p-2">
                    作成
                </button>
            </Form>
        </div>
    );
}
