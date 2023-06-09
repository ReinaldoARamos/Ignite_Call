import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./style";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const ClaimUserNameFormSchema = z.object({
userName: z.string(),

})

type ClaimUserNameFormData = z.infer<typeof ClaimUserNameFormSchema>

export function ClaimUserNameForm() {
  const { register, handleSubmit } = useForm();

  async function handleClaimUsername(data: any){
    console.log(data)
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="Seu-Usuário"
        {...register("username")}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  );
}
