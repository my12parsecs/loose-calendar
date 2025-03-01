"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent NextAuth's default redirect
    window.location.reload()
  };

  return (
    <div onClick={handleLogout} className="logout-button">Logout</div>
  );
}
