import React, { useState } from "react";
import { connect } from "react-redux";
import {
  toggleAddEventWidow,
  eventsListAmended,
} from "../../store/actions/index";
import { postEvents } from "../../services";

function AddEvent(props) {
  const { toggleAddEventWidow, userRole, dayChoosen, eventsListAmended } =
    props;
  console.log("the mark in addEvent:", dayChoosen);
  let [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    location: "",
    time: "",
    timeStamp: `${dayChoosen}`,
  });

  function hanleClick(e) {
    console.log(e);
    if (e.target.classList.contains("DayPicker-AddEvent-Wrapper")) {
      toggleAddEventWidow();
    }
  }

  function handleAddEvent(e) {
    e.preventDefault();
    postEvents("http://localhost:3000/events", eventDetails, userRole);
    eventsListAmended();
    toggleAddEventWidow();
  }

  function handleInputChange(event, input) {
    setEventDetails((prev) => {
      return {
        ...prev,
        [input]: event.target.value,
      };
    });
  }

  return (
    <div className="DayPicker-AddEvent-Wrapper" onClick={(e) => hanleClick(e)}>
      <div className="DayPicker-AddEvent">
        <form onSubmit={(e) => handleAddEvent(e)}>
          <input
            value={eventDetails.title}
            type="text"
            placeholder="event title"
            onChange={(e) => handleInputChange(e, "title")}
          ></input>
          <input
            value={eventDetails.description}
            type="text"
            placeholder="event description"
            onChange={(e) => handleInputChange(e, "description")}
          ></input>
          <input
            value={eventDetails.location}
            type="text"
            placeholder="event location"
            onChange={(e) => handleInputChange(e, "location")}
          ></input>
          <input
            value={eventDetails.time}
            type="time"
            name="preffered time"
            onChange={(e) => handleInputChange(e, "time")}
          ></input>
          <button onClick={(e) => handleAddEvent(e)}>add</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
    dayChoosen: state.dayChoosen,
  };
};

const mapDispatchToProps = {
  toggleAddEventWidow,
  eventsListAmended,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
