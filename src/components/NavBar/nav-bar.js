import React from "react";
import { connect } from "react-redux";
import { changeMonth } from "../../store/actions/index";
function NavBar(props) {
  const { changeMonth, monthsList, dateToRender } = props;

  function defineMonth(date) {
    console.log(+date.month - 1);
    return monthsList[+date.month - 1];
  }

  return (
    <div className="DayPicker-NavBar">
      <button
        className="btn btn-change-month"
        onClick={() => changeMonth("prev")}
      >
        &lt;
      </button>
      <div className="DayPicker-Caption">{defineMonth(dateToRender)}</div>
      <button
        className="btn btn-change-month"
        onClick={() => changeMonth("next")}
      >
        &gt;
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    monthsList: state.monthsList,
    currentDate: state.currentDate,
    dateToRender: state.dateToRender,
  };
};

const mapDispatchToProps = {
  changeMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
