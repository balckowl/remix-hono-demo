import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react

export const authClient = createAuthClient()

export const signIn = async () => {
    await authClient.signIn.social({
        provider: "github"
    })
}

export const signOut = async () => {
    await authClient.signOut()
}

export const { useSession } = authClient 
