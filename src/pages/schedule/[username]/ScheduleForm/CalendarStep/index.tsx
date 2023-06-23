import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useState } from "react";
import dayjs from 'dayjs'

export function CalendarStep() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate; //condicional, mostra o time picker quando a data é selecionada
  
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const describeDate = selectedDate ? dayjs(selectedDate).format('DD[ de ] MMMM') : null
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar  selectedDate={selectedDate} onDateSelected={setSelectedDate}/>

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
           {weekDay} <span>{describeDate}</span>
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
