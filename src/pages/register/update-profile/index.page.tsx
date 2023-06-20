import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,

} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { FormAnnotation, ProfileBox } from "./styles";

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

  async function handleUpdate(data: UpdateProfileData) {}

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
