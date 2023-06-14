import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";

import { ArrowRight } from "lucide-react";
import {signIn, useSession} from 'next-auth/react'
import { api } from "@/lib/axios";
import { AuthError, ConnectBox, ConnectItem, Container, Header } from "./styles";
import { useRouter } from "next/router";
/*


  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username
      });
    } catch (err) {
      if(err instanceof AxiosError && err.response?.data?.message){
        alert(err.response.data.message)
      
        return;
      }
      console.error(err)
    }
  }
* */


export default function connectCalender() {

  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error


  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>
          Conecte sua agenda
        </Text>
        <MultiStep size={4} currentStep={2}></MultiStep>
      </Header>
      <ConnectBox>
        <ConnectItem>
            <Text>
                Google Calendar
            </Text>
            <Button variant='secondary' size="sm" onClick={() => signIn('google')}>
          Conectar
          <ArrowRight />
        </Button>
        </ConnectItem>
       {hasAuthError && (
        <AuthError size='sm'>
            Falha ao se conectar ao Google, verifique se você habilitou as opções de acesso ao Google Calander
        </AuthError>
       )}
        <Button >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
     
    </Container>
    
  );
}
