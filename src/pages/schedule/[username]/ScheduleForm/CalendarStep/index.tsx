import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const isDateSelected = !!selectedDate; //condicional, mostra o time picker quando a data é selecionada

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null; //data selecionada formatada
  const router = useRouter(); //router para pegar o username na query
  const username = String(router.query.username); // username da query convertido em string

  const describeDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ] MMMM") //mes formatado
    : null;

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api
      .get(`users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, username]);
  //quando a selectedDate é alterada, ele faz uma chamada
  //na API e retorna os possible times e available times

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
                  disabled={!availability?.availableTimes.includes(hour)}
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
