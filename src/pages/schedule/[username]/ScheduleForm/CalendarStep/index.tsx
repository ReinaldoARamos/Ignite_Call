import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useState } from "react";

export function CalendarStep() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate; //condicional, mostra o time picker quando a data é selecionada
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar  selectedDate={selectedDate} onDateSelected={setSelectedDate}/>

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça-feira <span>20 de setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
            <TimePickerItem>08:00hr</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
