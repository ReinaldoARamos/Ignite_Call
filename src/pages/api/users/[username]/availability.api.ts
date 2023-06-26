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
  const referenceDate = dayjs(String(date)); //pega a data atual

  const isPastDate = referenceDate.endOf("day").isBefore(new Date()); //valida se a data é passada

  if (isPastDate) {
    return res.json({ possibleTimes: [], AvailableTimes: [] }); //valida a adat atual para desabilitar datas anteriores
  }
  if (!date) {
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

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
      //entra dentro to timeInterval e retorna o
      //que tiver cross com o id user
    },
  });

  if (!userAvailability) {
    return res.json({ possibleTimes: [], AvailableTimes: [] }); //valida a adat atual para desabilitar datas anteriores
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;

  const startHour = time_start_in_minutes / 60; //retorna a hora de inicio
  const endHour = time_end_in_minutes / 60; //retorna o fim em formato de hora

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i; //Hora de inicio mais o index
    }
  );

  const blockedTimes = await prisma.scheduling.findMany({
    //Entra dentro do scheduling e retorna os horariois que sao maiores que start hour]
    //e menroes que o end ghour, retornandoi assim todos os horarios entre os intervalos
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("hour", endHour).toDate(),
      },
    },
  });

  //available times passa por dnetro do array de possible times
  //ex [8, 9 , 10] e valida que nao existe nenhum registro na tabela de schedule que bate
  //p horario com a hora do agendamento
  const AvailableTimes = possibleTimes.filter((times) => {
    return !blockedTimes.some(
      (blockedTimes) => blockedTimes.date.getHours() === times

      //entra dentro do possible times e filtra retornando todos os que nao são blocked times e que
      //se igualao ao time que são os nossos horarios possiveis
    );
  });
  return res.json({ possibleTimes, AvailableTimes });
}
