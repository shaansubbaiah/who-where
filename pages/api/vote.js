import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/db";

export default async (req, res) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    // const accounts = await prisma.account.findMany();
    // console.log(accounts);
    // console.log(req.body);
    const data = JSON.parse(req.body);
    // console.log(data);
    // console.log(session);

    if (session) {
      await prisma.vote.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: data.date,
          },
        },
        update: {
          userId: session.user.id,
          date: data.date,
          location: data.location,
        },
        create: {
          userId: session.user.id,
          date: data.date,
          location: data.location,
        },
      });

      res.send({
        content: "Successfully voted",
      });
    } else {
      res.send({
        error:
          "You must be signed in to view the protected content on this page.",
      });
    }
  } else if (req.method === "GET") {
    try {
      const voteData = await prisma.vote.findMany();
      const userData = await prisma.user.findMany();

      res.send({
        content: { userData: userData, voteData: voteData },
      });
    } catch {
      res.send({
        error: "Error fetching voting data from the server.",
      });
    }
  }
};
