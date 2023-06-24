import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import dayjs from "dayjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username); //pega o username da query da URL
  const { date } = req.query; //pega na query da data a data selecionada
  const referenceDate = dayjs(String(date));

  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({ availability: [] }); //valida a adat atual para desabilitar datas anteriores
  }
  if (!date) {
    return res.status(400).json({ message: "Date not Valid" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User  not Found" });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  });
}

//

