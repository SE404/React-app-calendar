const changeMonth = (typeOfChange) => {
  return {
    type: "CHANGE_MONTH",
    typeOfChange: typeOfChange,
  };
};

const toggleAddEventWidow = (typeOfToggle) => {
  return {
    type: "TOGGLE_ADD_EVENT_WINDOW",
    typeOfToggle: typeOfToggle,
  };
};

export { changeMonth, toggleAddEventWidow };
