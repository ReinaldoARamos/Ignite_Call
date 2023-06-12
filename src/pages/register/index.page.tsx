import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const registerFormSchema = z.object({
  userName: z
  .string()
  .min(3, {message : 'O usuário precisa ter pelo menos 3 letras'})
  .regex(/^([a-z\\-]+)$/i, {message : 'O usuário pode ter apenas letras e hifens'})
  .transform((username) => username.toLowerCase()),

  name: z.string().min(3, {message : 'O nome precisa ter pelo menos 3 letras'})
})

type RegisterFormData = z.infer<typeof registerFormSchema>
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }
  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois
        </Text>
        <MultiStep size={4} currentStep={1}></MultiStep>
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuário" {...register('userName')}/>
          {errors.userName && (
            <FormError size="sm">{errors.userName.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-nome"  {...register('name')}/>
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
