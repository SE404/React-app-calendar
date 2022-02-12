const changeMonth = (typeOfChange) => {
  return {
    type: "CHANGE_MONTH",
    typeOfChange: typeOfChange,
  };
};

const toggleAddEventWidow = (dayChoosen = "") => {
  return {
    type: "TOGGLE_ADD_EVENT_WINDOW",
    dayChoosen: dayChoosen,
  };
};

const setUserRole = (userRole) => {
  return {
    type: "SET_USER_ROLE",
    userRole: userRole,
  };
};

const eventsListAmended = () => {
  return {
    type: "EVENTS_LIST_AMENDED",
  };
};

export { changeMonth, toggleAddEventWidow, setUserRole, eventsListAmended };
