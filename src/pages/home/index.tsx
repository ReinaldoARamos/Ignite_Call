import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./style";
import Image from 'next/image'
import previewImage from '../../assets/Preview.png'

export default function Home() {
  return (
    <div>
      <Container>
        <Hero>
          <Heading size={"4xl"}>
            Agendamento descomplicado
            <Text size={"lg"}>
              Conecte seu calendário e permita que as pessoas marquem
              agendamentos no seu tempo livre
            </Text>
          </Heading>
        </Hero>
        <Preview>
          <Image src={previewImage} height={400} alt="" quality={100} priority/>
        </Preview>
      </Container>
    </div>
  );
}
