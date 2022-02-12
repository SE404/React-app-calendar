import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleAddEventWidow } from "../../store/actions/index";
import { DateTime, getEvents, equalDate } from "../../services/index";

function MonthCalendar(props) {
  let [eventsPending, setEventsPending] = useState([]);
  let [eventsConfirmed, setEventsConfirmed] = useState([]);
  const { currentDate, daysList, toggleAddEventWidow, calendarUrl } = props;
  let { dateToRender, eventsListAmendedCounter } = props;
  let startDay = dateToRender.startOf("month").startOf("week");
  let endDay = dateToRender.endOf("month").endOf("week");
  let calendar = [];
  for (let i = startDay; i <= endDay; i = i.plus({ days: 1 })) {
    calendar.push(i);
  }
  let weekCounter = calendar.length / 7;

  useEffect(() => {
    setEventsPending([]);
    setEventsConfirmed([]);
    getEvents(
      calendarUrl,
      eventsPending,
      eventsConfirmed,
      startDay,
      endDay,
      sortMonthEvents
    );
  }, [dateToRender, eventsListAmendedCounter]);

  function handleDayClick(e, day) {
    e.stopPropagation();
    console.log(day);
    toggleAddEventWidow(day.toMillis());
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

  function isBusy(neededDay, schedule) {
    if (
      schedule.find((item) => {
        return equalDate(neededDay, DateTime.fromMillis(+item.timeStamp));
      })
    ) {
      return true;
    }
  }

  function sortMonthEvents(res) {
    let pending = [];
    let confirmed = [];
    res.forEach((ev) => {
      if (ev.type === "pending") {
        pending.push(ev);
      } else if (ev.type === "confirmed") {
        confirmed.push(ev);
      }
    });
    setEventsPending(pending);
    setEventsConfirmed(confirmed);
  }

  function renderDays(arr, start) {
    let arrOfDays = [];
    for (let i = start, j = 0; j < 7; j++, i++) {
      arrOfDays.push(
        <div
          className={defineDayClass(arr[i])}
          key={arr[i].toString()}
          onClick={(e) => handleDayClick(e, arr[i])}
        >
          <div className="DayWrapper">
            <div
              className={
                equalDate(arr[i], currentDate)
                  ? "NumberWrapper ActiveDay"
                  : "NumberWrapper"
              }
            >
              {arr[i].day}
            </div>
            {isBusy(arr[i], eventsPending) && (
              <div
                className="eventPending"
                style={{ backgroundColor: "green", color: "white" }}
              >
                p
              </div>
            )}
            {isBusy(arr[i], eventsConfirmed) && (
              <div
                className="eventConfirmed"
                style={{ backgroundColor: "blue", color: "white" }}
              >
                c
              </div>
            )}
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

  function renderDaysList(arr) {
    return arr.map((item) => {
      return (
        <div key={item} className="WeekDayName">
          {item}
        </div>
      );
    });
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
    calendarUrl: state.calendarUrl,
    eventsListAmendedCounter: state.eventsListAmendedCounter,
  };
};

const mapDispatchToProps = {
  toggleAddEventWidow,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthCalendar);
