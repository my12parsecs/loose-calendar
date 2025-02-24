

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../../../auth";  


// export function AuthButton() {
//     const router = useRouter()
//     const [session, setSession] = useState(null);
  
//     useEffect(() => {
//         async function checkSession() {
//           const res = await fetch("/api/auth/session"); // Fetch session data
//           const data = await res.json();
//           setSession(data.session);
//         }
//         checkSession();
//       }, []);
  
//       return (
//         // <form action={async() => {
//         //     handleAuth()
//         // }}>
//         //     <button type="submit">{session ? "Sign Out" : "Sign in with Google"}</button>
//         // </form>
//         // <button onClick={()=>{
//             // if(session){
//             //     signOut()
//             // }else{
//             //     signIn("google")
//             // }
//         // }}>{session ? "Sign Out" : "Sign in with Google"}</button>
//         // {session ? }
//       );
// }





// export async function AuthButton() {
//     const session = await auth()
  
//     return (
//       <form
//         action={async () => {
//           "use server";
//           session ? await signOut() : await signIn("google");
//         }}
//       >
//         <button type="submit">
//           {session ? "Sign Out" : "Sign in with Google"}
//         </button>
//       </form>
//     );
// }

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 


// export function SignOut() {
//   return (
//     <form
//       action={async () => {
//         "use server"
//         await signOut()
//         redirect("/")
//       }}
//     >
//       <button type="submit">Sign Out</button>
//     </form>
//   )
// }


