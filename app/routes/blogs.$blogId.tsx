
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { hono } from "lib/hono";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {

  const { blogId } = params
  invariant(blogId)

  const res = await hono.api.blogs[":id"].$get({
    param: {
      id: blogId 
    }
  })

  const blog = await res.json()

  return blog
}

export default function BlogDetail() {
  const blog = useLoaderData<typeof loader>();

  if(!blog){
    return <p>記事がありません。</p>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
}
