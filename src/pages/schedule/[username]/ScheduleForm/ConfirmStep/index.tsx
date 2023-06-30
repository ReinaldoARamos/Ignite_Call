import { CalendarBlank } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader, FormError } from "./styles";
import { Text, TextArea, TextInput, Button } from "@ignite-ui/react";
import { Clock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome tem que ter no mínimo 3 caractéres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  observation: z.string().nullable(),
});

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter()

  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {

    const {name, email, observation} = data
    await api.post(`users/${username}/schedule`, {
        name,
        observation,
        email,
        date: schedulingDate
    })

    await router.push(`/${username}`)
  }

  const describeDate = dayjs(schedulingDate).format("DD [de] MMMM [ de ] YYYY");
  const describeTime = dayjs(schedulingDate).format("HH:mm[h]");
  return (
    <ConfirmForm as={"form"} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>

        <Text>
          <Clock />
          {describeTime}
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
        <TextArea {...register("observation")} />
      </label>
      <FormActions>
        <Button
          type="button"
          variant={"tertiary"}
          onClick={onCancelConfirmation}
        >
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
