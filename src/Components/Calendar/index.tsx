import { CaretLeft, CaretRight } from "phosphor-react";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from "./style";
import { getWeekDays } from "@/utils/get-weekdays";
import { useState } from "react";
import dayjs from "dayjs";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const shortWeekDays = getWeekDays({ short: true });

  
  const currentYear = currentDate.format('YYYY')
  const currentMonth = currentDate.format('MMMM')
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
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
              return <th key={weekday}>{weekday}.</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><CalendarDay>1</CalendarDay></td>
            <td><CalendarDay>2</CalendarDay></td>
            <td><CalendarDay>3</CalendarDay></td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
