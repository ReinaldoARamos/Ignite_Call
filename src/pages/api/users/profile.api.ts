import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const UpdateProfileBodySchema = z.object({
  bio: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "PUT") {
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
  const { bio } = UpdateProfileBodySchema.parse(req.body);

 
 await prisma.user.update({
    where: {
        id: session.user.id
    },
    data: {
          bio,
    },
 })
  return res.status(204).end();
}
