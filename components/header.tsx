import { Session } from "better-auth";
import { signIn, signOut } from "lib/auth.client";

export default function Header({ session }: { session: Session | null }) {

  return (
    <header>
      <div className="container mx-auto">
        <h1>Honote</h1>
        {!session && <button type="button" onClick={async () => await signIn()}>
          ログイン
        </button>}
        {session && <button type="button" onClick={async () => await signOut()}>
          ログアウト
        </button>}
      </div>
    </header>
  );
}
