import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./style";
import { ArrowRight } from "phosphor-react";

export function ClaimUserNameForm() {
  return (
    <Form>
      <TextInput size="sm" prefix="ignite.com/" placeholder="Seu-Usuário" />
      <Button size="sm"  type="submit" >
        Reservar usuário 
        <ArrowRight />
      </Button>
    </Form>
  );
}
