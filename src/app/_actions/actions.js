
'use server'

import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../../../auth"
import {encrypt, decrypt} from "./encrypt"


export async function getSession(){
    const session = await auth()
    return session
}


export async function getPost(date){

    const session = await auth()
    if (!session?.user) return null

    const post = await prisma.post.findUnique({
        where: { 
            userId_date: {
                userId: session.user.id,
                date: date
            }
         }
    });  
    const postContent = post?.content
    return decrypt(postContent);
}

export async function upsertPost({date, content}){
    
    const session = await auth()
    if (!session?.user) return null

    const encryptedContent = encrypt(content)

    await prisma.post.upsert({
        where: { 
            userId_date: {              // Change here: use userId_date compound key
                userId: session.user.id,
                date: date
            }
        },
        update: { content: encryptedContent },
        create: { userId: session.user.id, date: date, content: content },
        include: {
            user: true
        }
    });
    // revalidatePath(`/posts/${id}`);
    revalidatePath("/")
}



export async function deleteUser(enteredEmail){
    // const enteredEmail = formData[0]
    console.log(enteredEmail);
    
    

    const session = await auth()
    if (!session?.user) return null

    if (session.user.email !== enteredEmail){
        throw new Error("Email does not match.")
    }

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
}