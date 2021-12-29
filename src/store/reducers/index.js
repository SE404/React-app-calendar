import { DateTime } from "luxon";
let currentDate = DateTime.now();
const initialState = {
  showAddEventWindow: false,
  dateToRender: currentDate,
  currentDate: currentDate,
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
      console.log("working");
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
      console.log("working");
      let updatedToggle = !state.showAddEventWindow;
      return {
        ...state,
        showAddEventWindow: updatedToggle,
      };

    default:
      return state;
  }
};

export default reducer;
