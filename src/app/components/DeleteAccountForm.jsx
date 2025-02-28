"use client"

import { useState } from "react"
import { deleteUser } from "../_actions/actions"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteAccountForm(){
    const router = useRouter()

    const [verify, setVerify] = useState(false)
    const [enteredEmail, setEnteredEmail] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        setError("")

        try {
            await deleteUser(enteredEmail)
            // If successful, you might want to redirect or show a success message
            toast.success('Account Deleted',
                {
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );
            router.push("/")
        } catch (error) {
            setError(error.message || "Failed to delete account. Please try again later.")
        }
    }

    return (
        <div className="delete-account-form">
            <div className="delete-account-warning">This action cannot be undone. All your data will be deleted as well.</div>

            {!verify && (
                <div onClick={()=>{setVerify(true)}} className="delete-account-button">Delete Account</div>
            )}
            {verify && (
                <form action={handleSubmit}>
                    <input type="text" name="email" placeholder="Enter your email to confirm" onChange={(e) => setEnteredEmail(e.target.value)} required />
                    <div className="form-button-container">
                        <div onClick={()=>{setVerify(false); setError("")}} className="form-cancel">Cancel</div>
                        <button type="submit" className="form-submit">Really Delete Account</button>
                    </div>
                </form>
            )}

            {(verify && error) && (
                <div className="error-message">{error}</div>
            )}
        </div>
    )
}