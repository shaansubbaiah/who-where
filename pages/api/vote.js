import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dayjs from "dayjs";

export default async (req, res) => {
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
          date: dayjs(data.date).format("DD/MM/YYYY"),
        },
        // user_id: session.user.id,
        // date: data.date,
      },
      update: {
        userId: session.user.id,
        date: dayjs(data.date).format("DD/MM/YYYY"),
        location: data.location,
      },
      create: {
        userId: session.user.id,
        date: dayjs(data.date).format("DD/MM/YYYY"),
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
};
