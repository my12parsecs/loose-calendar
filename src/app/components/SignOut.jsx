"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();

  const [clickLogout, setClickLogout] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      router.push('/'); // Redirect to home page after sign-out
    };

    if(clickLogout){
      handleLogout();
      setClickLogout(false);
    }
  }, [clickLogout]);

  return (
    <div onClick={() => setClickLogout(true)} className="logout-button">Logout</div> // Button to trigger sign-out manually if needed
  );
}
