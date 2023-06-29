import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  if (selectedDateTime) {
    return <ConfirmStep schedulingDate={selectedDateTime} />; //abre o forumário caso uma data seja selecionada

  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />; //seta o objeto no estado
}
