import React from "react";
import { connect } from "react-redux";
import { toggleAddEventWidow } from "../../store/actions/index";

function MonthCalendar(props) {
  const { currentDate, monthsList, daysList, toggleAddEventWidow } = props;

  console.log(monthsList);
  let { dateToRender } = props;

  let startDay = dateToRender.startOf("month").startOf("week");
  let endDay = dateToRender.endOf("month").endOf("week");

  let calendar = [];
  for (let i = startDay; i <= endDay; i = i.plus({ days: 1 })) {
    calendar.push(i);
  }
  console.log(calendar);
  let weekCounter = calendar.length / 7;

  function renderDaysList(arr) {
    return arr.map((item) => {
      return (
        <div key={item} className="WeekDayName">
          {item}
        </div>
      );
    });
  }

  function defineDayClass(day) {
    let dayClass = "DayPicker-Day";
    if (day.weekday > 5) {
      dayClass = "DayPicker-Day Weekend";
    }
    if (day.month !== dateToRender.month) {
      dayClass = "DayPicker-Day OtherMonth";
    }
    return dayClass;
  }

  function isCurrentDay(day) {
    return (
      day.hasSame(currentDate, "year") &&
      day.hasSame(currentDate, "month") &&
      day.hasSame(currentDate, "day")
    );
  }

  function handleDayClick(e, day) {
    e.stopPropagation();
    console.log(day);
    toggleAddEventWidow();
  }

  function renderDays(arr, start) {
    let arrOfDays = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfDays.push(
        <div
          className={defineDayClass(arr[i])}
          key={arr[i].toString()}
          onClick={(e, day) => handleDayClick(e, arr[i])}
        >
          <div className="DayWrapper">
            <div
              className={
                isCurrentDay(arr[i])
                  ? "NumberWrapper ActiveDay"
                  : "NumberWrapper"
              }
            >
              {arr[i].day}
            </div>
          </div>
        </div>
      );
    }
    return arrOfDays;
  }

  function renderWeeks(arr) {
    let arrOfWeeks = [];
    for (let j = 0, days = 0; j < weekCounter; j++, days += 7) {
      arrOfWeeks.push(
        <div className="DayPicker-Week" key={j}>
          {renderDays(arr, days)}
        </div>
      );
    }
    return arrOfWeeks;
  }

  return (
    <>
      <div className="DayPicker-Months">
        <div className="DayPicker-Month">
          <div className="DayPicker-Weekdays">{renderDaysList(daysList)}</div>
          <div className="DayPicker-Body">{renderWeeks(calendar)}</div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    monthsList: state.monthsList,
    currentDate: state.currentDate,
    dateToRender: state.dateToRender,
    holidaysList: state.holidaysList,
    daysList: state.daysList,
    showAddEventWindow: state.showAddEventWindow,
  };
};

const mapDispatchToProps = {
  toggleAddEventWidow,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthCalendar);
