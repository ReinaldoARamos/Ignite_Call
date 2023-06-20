import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import {z} from 'zod'
import { prisma } from "@/lib/prisma";

const timeIntervalsBodySchema = z.object({
    intervals: z.array(z.object({
        weekday: z.number(),
        starTimeInMinutes: z.number(),
        endTimeInMinutes: z.number(),
    }))
})

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

  if(!session) {
        return res.status(401).end()
  }
  const {intervals} = timeIntervalsBodySchema.parse(req.body)
  
 
  await Promise.all(intervals.map((interval) => {
    return prisma.userTimeInterval.create({
      data: {
        week_day: interval.weekday,
        time_end_in_minutes: interval.endTimeInMinutes,
        time_start_in_minutes: interval.starTimeInMinutes,
        user_id: session?.user.id
      }
    })
  }))
  return res.json({
    session, //retorna um JSON com as informações da session do usuário
  });
}
