import { CalendarBlank } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { Text, TextArea, TextInput, Button } from "@ignite-ui/react";
import { Clock } from "lucide-react";

export function ConfirmStep() {
  function handleConfirmScheduling() {}
  return (
    <ConfirmForm as={"form"} onSubmit={handleConfirmScheduling}>
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
        <TextInput placeholder="Seu Nome"/>
      </label>
      <label>
        <Text size="sm">Endereço de E-mail</Text>
        <TextInput placeholder="Seu E-Mail"/>
      </label>

      <label>
        <Text size="sm">Endereço de E-mail</Text>
        <TextArea />
      </label>
    <FormActions>
        <Button type="button" variant={"tertiary"}>Cancelar</Button>
        <Button type="submit">Confirmar</Button>
    </FormActions>

    </ConfirmForm>
  );
}
