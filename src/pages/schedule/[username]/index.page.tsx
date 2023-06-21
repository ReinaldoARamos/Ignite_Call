import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./style";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";
import { ScheduleForm } from "./ScheduleForm";

interface ScheduleProps {
    user: {
        name: string
        bio: string
        avatarUrl: string
    }
}
export default function Schedule({user} : ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  );
}

export const getStaticPaths : GetStaticPaths = async () => {
return {
    paths: [], //colocando isso na hora  da build ele nao gera a página estática, somente quando tiver
    //o parâmetro
    fallback: 'blocking'
}

}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({ where: { username: username } });

  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: {
        name: user.username,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      }
    },
        revalidate: 60 * 60 * 24 * 1
};

};
