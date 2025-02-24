
import { auth } from "../../../../auth";
import prisma from "../../../../lib/prisma";
import {decrypt} from "../../_actions/encrypt"

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: {
      userId_date: {
        userId: session.user.id,
        date: date,
      },
    },
  });

  return Response.json({ content: decrypt(post?.content) || "" });
}
