import { CalendarBlank } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader, FormError } from "./styles";
import { Text, TextArea, TextInput, Button } from "@ignite-ui/react";
import { Clock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const confirmFormSchema = z.object({
  name: z.string().min(3, {message: 'Nome tem que ter no mínimo 3 caractéres'}),
  email: z.string().email({message: 'Digite um e-mail válido'}),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data);
  }
  return (
    <ConfirmForm as={"form"} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu Nome" {...register("name")} />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de E-mail</Text>
        <TextInput placeholder="Seu E-Mail" {...register("email")} />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de E-mail </Text>
        <TextArea {...register("observations")} />

      </label>
      <FormActions>
        <Button type="button" variant={"tertiary"}>
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
