import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./style";
import Image from "next/image";
import previewImage from "../../assets/Preview.png";
import { ClaimUserNameForm } from "../components/ClaimUserNameForm";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo title="Home" description="Home Page" />
      <div>
        <Container>
          <Hero>
            <Heading size={"4xl"}>
              Agendamento descomplicado
              <Text size={"xl"}>
                Conecte seu calendário e permita que as pessoas marquem
                agendamentos no seu tempo livre
              </Text>
            </Heading>
            <ClaimUserNameForm />
          </Hero>
          <Preview>
            <Image
              src={previewImage}
              height={400}
              alt=""
              quality={100}
              priority
            />
          </Preview>
        </Container>
      </div>
    </>
  );
}
