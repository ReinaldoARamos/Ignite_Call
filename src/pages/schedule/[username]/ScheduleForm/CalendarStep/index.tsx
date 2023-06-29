import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

interface Availability {
  possibleTimes: number[];
  AvailableTimes: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [availability, setAvailability] = useState<Availability | null>(null);
  const isDateSelected = !!selectedDate; //condicional, mostra o time picker quando a data é selecionada

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null; //data selecionada formatada
  const router = useRouter(); //router para pegar o username na query
  const username = String(router.query.username); // username da query convertido em string

  const describeDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ] MMMM") //mes formatado
    : null;

  //-----------------------------------------------------------------
  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: availability } = useQuery<Availability>(
    ["availability", selectedDateWithoutTime],
    async () => {
      const response = await api.get(`users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      });

      return response.data;
    },
    {
      enabled: !!selectedDate,
    }
  );
  //-----------------------------------------------------------------

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();

    onSelectDateTime(dateWithTime);
  }
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability?.AvailableTimes.includes(hour)}
                  onClick={() => handleSelectTime(hour)}
                >
                  {String(hour).padStart(2, "0")}:00
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
