import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from "./style";
import { ArrowRight, Check } from "phosphor-react";

export default function connectCalender() {
  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>Quase lá...</Text>
        <MultiStep size={4} currentStep={3}></MultiStep>
      </Header>

      <IntervalBox as="form">
        <IntervalContainer>
          <IntervalItem>
            <IntervalDay>
                <Checkbox  />  
                <Text>
                    Segunda-feira
                </Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" step={60}/>
              <TextInput size="sm" type="time" step={60}/>
              
            </IntervalInputs>
            

            
          </IntervalItem>

          <IntervalItem>
            <IntervalDay>
            <Checkbox  />  
                <Text>
                    Terça-feira
                </Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" step={60}/>
              <TextInput size="sm" type="time" step={60}/>
              
            </IntervalInputs>
            

            
          </IntervalItem>
        </IntervalContainer>
        <Button type="submit">Próximo passo <ArrowRight /></Button>
      </IntervalBox>
    </Container>
  );
}
