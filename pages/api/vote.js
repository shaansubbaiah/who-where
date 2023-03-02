import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dayjs from "dayjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const prisma = new PrismaClient();
    // const accounts = await prisma.account.findMany();

    // console.log(accounts);
    console.log(req.body);
    const data = JSON.parse(req.body);
    console.log(data);
    console.log(session);

    if (session) {
      await prisma.vote.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: data.date,
          },
          // user_id: session.user.id,
          // date: data.date,
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
        content:
          "This is protected content. You can access this content because you are signed in.",
      });
    } else {
      res.send({
        error:
          "You must be signed in to view the protected content on this page.",
      });
    }
  } else if (req.method === "GET") {
    const prisma = new PrismaClient();

    try {
      const voteData = await prisma.vote.findMany();
      const userData = await prisma.user.findMany();
      // const data = await prisma.vote.findMany({
      //   select: {
      //     date: true,
      //     location: true,
      //     user: {
      //       select: {
      //         name: true,
      //         email: true,
      //         image: true,
      //       },
      //     },
      //   },
      // });
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
