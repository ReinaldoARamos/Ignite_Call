import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { parseCookies, destroyCookie } from "nookies";

export default function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'] ,
  res: NextApiResponse | NextPageContext['res']
): Adapter {
  return {
    async createUser(user) {
      const { "@ignitecall:userId": userIdOnCookies } = parseCookies({ req });

      if (!userIdOnCookies) {
        throw new Error("user ID not found on cookies");
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      destroyCookie({ res }, "@ignitecall:userId", {
        path: "/",
      });

      return {
        id: prismaUser?.id,
        name: prismaUser.name,
        avatar_url: prismaUser?.avatar_url!,
        email: prismaUser.email!,
        username: prismaUser?.username,
        emailVerified: null,
      };
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user?.id,
        name: user.name,
        avatar_url: user?.avatar_url!,
        email: user.email!,
        username: user?.username,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }
      return {
        id: user?.id,
        name: user.name,
        avatar_url: user?.avatar_url!,
        email: user.email!,
        username: user?.username,
        emailVerified: null,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.accounts.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user?.id,
        name: user.name,
        avatar_url: user?.avatar_url!,
        email: user.email!,
        username: user?.username,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });
      return {
        id: prismaUser?.id,
        name: prismaUser.name,
        avatar_url: prismaUser?.avatar_url!,
        email: prismaUser.email!,
        username: prismaUser?.username,
        emailVerified: null,
      };
    },

    async linkAccount(account) {
      await prisma.accounts.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
          provider_account_id: account.providerAccountId,
        },
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {},
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      });

      return {
        userId,
        sessionToken,
        expires,
      };
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!prismaSession) {
        return null;
      }

      const { user, ...session } = prismaSession;
      return {
        session: {
          expires: session.expires,
          userId: sessionToken,
          sessionToken: session.session_token,
        },
        user: {
          id: user?.id,
          name: user.name,
          avatar_url: user?.avatar_url!,
          email: user.email!,
          username: user?.username,
          emailVerified: null,
        },
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const PrismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires: expires,
          user_id: userId,
        },
      });
      return {
        sessionToken: PrismaSession.session_token,
        userId: PrismaSession.user_id,
        expires: PrismaSession.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });
    },
  };
}
