import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { Container, Header } from "../styles";
import {FormError} from './style'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from "./style";
import { ArrowRight, Check } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { getWeekDays } from "@/utils/get-weekdays";
import { zodResolver } from "@hookform/resolvers/zod";

const TimeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekday: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled)
    )
    .refine((intervals) => intervals.length > 0, {message: "Intervals"}),
});

type TimeIntervalsFormData = z.infer<typeof TimeIntervalsFormSchema>;

export default function connectCalender() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(TimeIntervalsFormSchema),
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

  const intervals = watch("intervals"); //retorna em tempo real alteração de valores
  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    name: "intervals",
    control,
  });

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data);
  }
  return (
    <Container>
      <Header>
        <Heading as="strong" />
        <Text>Quase lá...</Text>
        <MultiStep size={4} currentStep={3}></MultiStep>
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked == true);
                          }}
                          checked={field.value}
                        />
                      );
                    }}
                  />
                  <Text>{weekDays[field.weekday]} </Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    disabled={intervals[index].enabled === false}
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    disabled={intervals[index].enabled === false}
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalContainer>
        {errors.intervals && (
          <FormError size='sm'>
            {errors.intervals.message}
          </FormError>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
