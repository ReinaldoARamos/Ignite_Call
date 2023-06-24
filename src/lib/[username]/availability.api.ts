import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../prisma";
import dayjs from "dayjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method != "GET" ) {
        return res.status(405).end()
    }

    const username = String(req.query.username)
    const {date}  = req.query 

    if(!date) {
        return res.status(400).json({message: "Date not Valid"})
    }

    const user = prisma.user.findUnique({
        where: {
            username,
        }
    })

    if(!user) {
        return res.status(400).json({message: "User  not Found"})
    }

    const referenceDate = dayjs(String(date))

    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if(isPastDate){
        return res.json({availability: []})
    }

}
