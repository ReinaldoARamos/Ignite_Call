import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";

import { ArrowRight } from "lucide-react";
import {signIn, useSession} from 'next-auth/react'
import { api } from "@/lib/axios";
import { ConnectBox, ConnectItem, Container, Header } from "./styles";
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

  //const session = useSession()


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
       
        <Button >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
     
    </Container>
    
  );
}
