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
import { useMemo, useState } from "react";
import dayjs from "dayjs";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });
  const shortWeekDays = getWeekDays({ short: true });
  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, "month");

    setCurrentDate(previousMonth);
  }

  function handleNextMonth() {
    const NextMonth = currentDate.add(1, "month");

    setCurrentDate(NextMonth);
  }

  const currentYear = currentDate.format("YYYY");
  const currentMonth = currentDate.format("MMMM");


  //-----------------------------------------------------------------
  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      //constróu um array
      length: currentDate.daysInMonth(), //pega o currentDate e o daysinmonth da api dayjs
    }).map((_, i) => {
      //faz um map retornando o index, ja que ovalor de todos é undefined
      return currentDate.set("date", i + 1); //pega o valor e faz um set date(DIA do mes ) i(index) + 1
    });


    const lastWeekDay = currentDate
      .set("date", currentDate.daysInMonth()) //pega o último dia do mes
      .get("day");

    //------------------------------------------

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    ); //pega o último dia do mes

       
    const firtsWeekDay = lastDayInCurrentMonth.get("day");
   //------------------------------------------
 
    //------------------------------------------
    const previousMonthFillArray = Array.from({
      length: firtsWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day");
      })
      .reverse();

    //------------------------------------------

    //------------------------------------------

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map(date => {
        return {date, disabled: true}
      }),
      ...nextMonthFillArray.map(date => {
        return {date, disabled: true}
      }),,
      ...daysInMonthArray.map(date => {
        return {date, disabled: false}
      }),
    ]
  
 const calendarWeeks = calendarDays.reduce(() => {

 } , [])
 
    return calendarDays
  }, [currentDate]);

  console.log(calendarWeeks);

  //------------------------------------------
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft onClick={handlePreviousMonth} />
            <title>Previous Month</title>
          </button>

          <button>
            <CaretRight onClick={handleNextMonth} />
            <title>Next Month</title>
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
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
