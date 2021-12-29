import React from "react";
import { connect } from "react-redux";
import MonthCalendar from "../MonthCalendar/month-calendar";
import NavBar from "../NavBar/nav-bar";
import AddEvent from "../AddEvent/add-event";

function App(props) {
  let { showAddEventWindow } = props;
  return (
    <div className="DayPicker-wrapper">
      <NavBar></NavBar>
      <MonthCalendar></MonthCalendar>
      {showAddEventWindow ? <AddEvent></AddEvent> : ""}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showAddEventWindow: state.showAddEventWindow,
  };
};

export default connect(mapStateToProps)(App);
