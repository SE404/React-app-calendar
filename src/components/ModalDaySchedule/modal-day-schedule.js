import React, { useState } from "react";
import { connect } from "react-redux";

function ModalDaySchedule(props) {
  return (
    <>
      <div className="DayPicker-DaySchedule">
        <p>test</p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ModalDaySchedule);
