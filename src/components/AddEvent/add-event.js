import React from "react";
import { connect } from "react-redux";
import { toggleAddEventWidow } from "../../store/actions/index";

function AddEvent(props) {
  const { toggleAddEventWidow } = props;

  function hanleClick(e) {
    console.log(e);
    if (e.target.classList.contains("DayPicker-AddEvent-Wrapper")) {
      toggleAddEventWidow();
    }
  }

  function handleAddEvent(e) {
    e.preventDefault();

    console.log("added");
  }

  return (
    <div className="DayPicker-AddEvent-Wrapper" onClick={(e) => hanleClick(e)}>
      <div className="DayPicker-AddEvent">
        <form onSubmit={(e) => handleAddEvent(e)}>
          <input type="text" placeholder="add event"></input>
          <input type="time" name="selected_time" list="time-list"></input>
          <datalist id="time-list">
            <option value="10:00"></option>
            <option value="11:00"></option>
            <option value="12:00"></option>
          </datalist>
          <button onClick={(e) => handleAddEvent(e)}>add</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  toggleAddEventWidow,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
