import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";

import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import {
  AuthError,
  ConnectBox,
  ConnectItem,
  Container,
  Header,
} from "./styles";
import { useRouter } from "next/router";
import { Checks } from "phosphor-react";

async function handleConnectCalendars() {
  signIn("google");
}
export default function TimeIntervals() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;

  const isSignedIn = session.status === "authenticated";
  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>Conecte sua agenda</Text>
        <MultiStep size={4} currentStep={2}></MultiStep>
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Checks />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendars}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            opções de acesso ao Google Calander
          </AuthError>
        )}
        <Button disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
