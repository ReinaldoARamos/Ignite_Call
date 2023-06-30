import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const username = String(req.query.username); //pega o username da query da URL

  const user = await prisma.user.findUnique({
    where: {
      username, //pega o usuário para fazer os crossings //retorna o user
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User  not Found" });
  }

  const createSchedulingBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    observation: z.string(),
    date: z.string().datetime(),
  });
  const { name, email, observation, date } = createSchedulingBodySchema.parse(
    req.body
  );


  const schedulingDate = dayjs(date).startOf('hour')

  if (!date) {
    return res.status(400).json({ message: "Date not Valid" });
  }

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: "Date is in the past" });
  }

  const conflitScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate()
    }
  })


  if (conflitScheduling) {
    return res.status(400).json({ message: "There is another scheduling at the same time" });
  }

  await prisma.scheduling.create({
    data: {
      date: schedulingDate.toDate(),
      name,
      observation,
      email,
      user_id: user.id
    }
  })
  return res.status(201).end();
}
