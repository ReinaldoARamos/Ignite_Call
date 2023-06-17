import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { Container, Header } from "../styles";
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from "./style";
import { ArrowRight, Check } from "phosphor-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const TimeIntervalsFormSchema = z.object({});
export default function connectCalender() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        {
          weekday: 0,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 1,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 2,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 3,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 4,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 5,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekday: 6,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
      ],
    },
  });

  const { fields} = useFieldArray({
    name: 'intervals',
    control,
  })

  async function handleSetTimeIntervals() {}
  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>Quase lá...</Text>
        <MultiStep size={4} currentStep={3}></MultiStep>
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
        {fields.map((field) => {
            return (
                <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{field.weekday} </Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput size="sm" type="time" step={60} />
                  <TextInput size="sm" type="time" step={60} />
                </IntervalInputs>
              </IntervalItem>
    
            
            )
        })}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
