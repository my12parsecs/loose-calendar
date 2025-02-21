
'use server'

import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../../../auth"


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
    console.log(postContent);
    return postContent;
}

export async function upsertPost({date, content}){
    
    const session = await auth()
    if (!session?.user) return null

    await prisma.post.upsert({
        where: { 
            userId_date: {              // Change here: use userId_date compound key
                userId: session.user.id,
                date: date
            }
        },
        update: { content: content },
        create: { userId: session.user.id, date: date, content: content }
    });
    // revalidatePath(`/posts/${id}`);
}