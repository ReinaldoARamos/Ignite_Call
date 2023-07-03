import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";
import { google } from "googleapis";
import { getGoogleOAuthToken } from "@/lib/google";
import { randomUUID } from "crypto";
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

  const schedulingDate = dayjs(date).startOf("hour");

  if (!date) {
    return res.status(400).json({ message: "Date not Valid" });
  }

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: "Date is in the past" });
  }

  const conflitScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  });

  if (conflitScheduling) {
    return res
      .status(400)
      .json({ message: "There is another scheduling at the same time" });
  }

 const scheduling =  await prisma.scheduling.create({
    data: {
      date: schedulingDate.toDate(),
      name,
      observation,
      email,
      user_id: user.id,
    },
  });

  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOAuthToken(user.id),
  });

  await calendar.events.insert({
    calendarId: "primary", //pega o caldendario default
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observation,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, "hour").format(),
      },
      attendees: [
        {
          email,
          displayName: name,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',

          }
        }
      }
    },
  });

  return res.status(201).end();
}
