import { prisma } from "@/lib/prisma";
import { setCookie } from "nookies";
import { NextPageContext, type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest ,
  res: NextApiResponse 
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const { name, username } = req.body;

  console.log(req.body)
  const userExist = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res }, "@ignitecall:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, //7 days to expire the cookie,
    path: "/", //todas as rotas acessam os cookies
  });

  return res.status(201).json(user);
}
