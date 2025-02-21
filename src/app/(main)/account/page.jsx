

import "../../stylesheets/account.css";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import ClientTimeLocale from "../../components/ClientTimeLocale";
import prisma from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Menu() {
  const session = await auth()

// console.log(session.user.id);

  
 
//   if (!session?.user) return redirect("/")

  return (
    <div className="account-page" style={{height: '100%', minHeight: 'calc(100dvh - 35px)'}}>
        <h1>Account</h1>

        {!session?.user ? (
            <div className="account-page-content">
                <h2>Please login to see your account</h2>
            </div>
        ) : (
            <div className="account-page-content">
                <div className="account-info">
                    <img src={session.user.image} alt="User Avatar" className="account-avatar" />
                    <p className="account-name">{session.user.name}</p>
                </div>

                <div className="account-time">
                    <ClientTimeLocale />
                </div>

                <div className="account-danger-zone">
                    <form
                        action={async () => {
                        "use server"
                            if(!session.user) return
                            try {
                                // First, delete all posts associated with the user
                                await prisma.post.deleteMany({
                                  where: {
                                    userId: session.user.id
                                  }
                                });
                                // Then delete the user
                                await prisma.user.delete({
                                  where: {
                                    id: session.user.id,
                                    email: session.user.email
                                  }
                                });

                            } catch (error) {
                                console.error("Error deleting account:", error);
                                throw new Error("Failed to delete account. Please try again later.");
                            }
                            redirect("/")
                        }}
                    >
                        <button className="delete-account-button" type="submit">Delete Account</button>
                        <div className="delete-account-warning">This action cannot be undone.</div>
                    </form>
                </div>
            </div>
        )}

    </div>
  );
}