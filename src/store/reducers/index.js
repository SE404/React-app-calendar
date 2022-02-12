import { DateTime } from "luxon";
let currentDate = DateTime.now();
const initialState = {
  calendarUrl: "http://localhost:3000/events",
  showAddEventWindow: false,
  eventsListAmendedCounter: 0,
  dayChoosen: "",
  dateToRender: currentDate,
  currentDate: currentDate,
  userRole: "lecturer",
  monthsList: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  holidaysList: [{ month: 1, days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }],
  daysList: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MONTH":
      if (action.typeOfChange === "prev") {
        let date = state.dateToRender.minus({ months: 1 });
        return {
          ...state,
          dateToRender: date,
        };
      } else if (action.typeOfChange === "next") {
        let date = state.dateToRender.plus({ months: 1 });
        return {
          ...state,
          dateToRender: date,
        };
      } else {
        return state;
      }
    case "TOGGLE_ADD_EVENT_WINDOW":
      let updatedToggle = !state.showAddEventWindow;
      // console.log("dayChoosen is", action.dayChoosen);
      return {
        ...state,
        showAddEventWindow: updatedToggle,
        dayChoosen: action.dayChoosen,
      };
    case "SET_USER_ROLE":
      return {
        ...state,
        userRole: action.userRole,
      };
    case "EVENTS_LIST_AMENDED":
      console.log("amended");
      let newCounter = state.eventsListAmendedCounter + 1;
      return {
        ...state,
        eventsListAmendedCounter: newCounter,
      };

    default:
      return state;
  }
};

export default reducer;
