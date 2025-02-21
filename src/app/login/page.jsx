import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";

import "../stylesheets/login.css";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="login-page">
      <form className="login-form"
        action={async () => {
          "use server";
          await signIn("google");
        }}>
        <button className="login-button" type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
