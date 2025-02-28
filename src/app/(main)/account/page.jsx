

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
import DeleteAccountForm from "../../components/DeleteAccountForm";

export default async function Menu() {
  const session = await auth()

  return (
    <div className="account-page">
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
                    <DeleteAccountForm />
                </div>
            </div>
        )}

    </div>
  );
}