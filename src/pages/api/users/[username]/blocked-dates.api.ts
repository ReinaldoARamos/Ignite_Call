import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
//import dayjs from "dayjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username); //pega o username da query da URL
  const { year, month } = req.query; //pega na query da data a data selecionada

  if (!year || !month) {
    return res.status(400).json({ message: "Date not Valid" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username, //pega o usuário para fazer os crossings //retorna o user
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User  not Found" });
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },

    where: {
      user_id: user.id,
    },
  });
  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekday) => {
    return !availableWeekDays.some(
      (availableWeekDays) => availableWeekDays.week_day === weekday
    );
  });

  const yearMonth = `${year}-${String(month).padStart(2, "0")}`;
  
  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
  SELECT
    EXTRACT(DAY FROM S.DATE) AS date,
    COUNT(S.date) AS amount,
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
  FROM schedulings S
  LEFT JOIN user_time_intervals UTI
    ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
  WHERE S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, "%Y-%m") = ${`${yearMonth}`}
  GROUP BY EXTRACT(DAY FROM S.DATE),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
  HAVING amount >= size
`

const blockedDates = blockedDatesRaw.map((item) => item.date)

return res.json({ blockedWeekDays, blockedDates })
}