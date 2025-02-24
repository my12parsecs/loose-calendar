
import { auth } from "../../../../auth";
import prisma from "../../../../lib/prisma";
import {decrypt} from "../../_actions/encrypt"

export async function GET(req) {
    
  const { searchParams } = new URL(req.url);  
  const dates = searchParams.get("dates")?.split(",") || [];
  
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: {
      AND: [
        { userId: session.user.id },
        { date: { in: dates } }
      ]
    },
    orderBy: {
      date: 'asc'
    }
  });

  // Convert posts into an object with date as the key and parsed content
  const postsByDate = Object.fromEntries(
    dates.map((date) => [
      date,
      posts.find((post) => post.date === date)?.content
        ? JSON.parse(decrypt(posts.find((post) => post.date === date).content))
        : "",
    ])
  );
  
  return Response.json(postsByDate);
}
