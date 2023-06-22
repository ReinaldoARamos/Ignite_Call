import { Calendar } from "@/Components/Calendar";
import { Container, TimePicker } from "./styles";

export function CalendarStep() {

    const isDateSelected = true
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker></TimePicker>

      )}
    </Container>
  );
}
