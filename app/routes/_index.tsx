import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { hono } from "lib/hono";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

//server only
export const loader = async () => {
  const res = await hono.api.blogs.$get()
  const blogs = await res.json()

  return blogs
}

export default function Index() {
  const blogs = useLoaderData<typeof loader>();

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
        </div>
      ))}
    </div>
  );
}
