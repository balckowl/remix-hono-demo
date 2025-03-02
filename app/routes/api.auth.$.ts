import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { auth as authClient } from '../../lib/auth' // Adjust the path as necessary

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { env } = context.cloudflare

  const auth = authClient(
    env.TURSO_CONNECTION_URL,
    env.TURSO_AUTH_TOKEN,
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET
  )

  return auth.handler(request)
}

export async function action({ request, context }: ActionFunctionArgs) {
  const { env } = context.cloudflare

  const auth = authClient(
    env.TURSO_CONNECTION_URL,
    env.TURSO_AUTH_TOKEN,
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET
  )
  
  return auth.handler(request)
}
