import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,

} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const session = useSession()

  const router = useRouter()
  console.log(session)

  async function handleUpdate(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois
        </Text>
        <MultiStep size={4} currentStep={4}></MultiStep>
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdate)}>
        <label>
          <Text size="sm">Foto de Perfil</Text>
          <Avatar src={session.data?.user.avatar_url}/>
        </label>

        <label>
          <Text size="sm">Sobre Você</Text>
          <TextArea prefix="ignite.com/" {...register("bio")} />
          <FormAnnotation size="sm">
            Falta pouco para você finalizar o seu cadastro
          </FormAnnotation>
        </label>

        <Button type="submit">
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res) //pega as opções de build do next auth, como scope e providers
  );

  
  return {
    props: {

    }
  }
}

