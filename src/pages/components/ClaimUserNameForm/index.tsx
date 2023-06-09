import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./style";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ClaimUserNameFormSchema = z.object({
  userName: z
    .string()
    .min(3, {message : 'O usuário precisa ter pelo menos 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {message : 'O usuário pode ter apenas letras e hifens'})
    .transform((username) => username.toLowerCase()),
});

type ClaimUserNameFormData = z.infer<typeof ClaimUserNameFormSchema>;

export function ClaimUserNameForm() {
  const { register, handleSubmit, formState:  {errors}} = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(ClaimUserNameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUserNameFormData) {
    console.log(data.userName);
  }
  return (
    <>
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="Seu-Usuário"
        {...register("userName")}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    
    </Form>
      <FormAnnotation>
      <Text size='sm'>{errors.userName ? errors.userName?.message : 'Digite o nome do usuário '}</Text>
    </FormAnnotation>
    </>
  );
}
