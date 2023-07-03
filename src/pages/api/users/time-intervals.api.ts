import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end(); //retorna erro caso tentem outro método
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res) //pega as opções de build do next auth, como scope e providers
  );

  if (!session) {
    return res.status(401).end();
  }
  const { intervals } = timeIntervalsBodySchema.parse(req.body);

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          user_id: session?.user.id,
        },
      });
    })
  );
  return res.status(201).end();
}
