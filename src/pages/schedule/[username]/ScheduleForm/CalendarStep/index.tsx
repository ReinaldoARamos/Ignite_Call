import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";

export function CalendarStep() {
  const isDateSelected = !true;
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

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
