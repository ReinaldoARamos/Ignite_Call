import { CaretLeft, CaretRight } from "phosphor-react";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
} from "./style";
import { getWeekDays } from "@/utils/get-weekdays";

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true });
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Dezembro <span>2022</span>
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft />
          </button>

          <button>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
           {shortWeekDays.map((weekday) => {
            return <th key={weekday}>{weekday}.</th>
           })}
          </tr>
        </thead>
      </CalendarBody>
    </CalendarContainer>
  );
}
