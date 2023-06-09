import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, Header } from "./styles";
import { ArrowRight } from "lucide-react";

export default function Register() {
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
      <Form as="form">
        <label>
          <Text size="sm">Usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuário" />
        </label>

        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-nome" />
        </label>

        <Button type="submit">
          Próximo passo 
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
