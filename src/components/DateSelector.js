import React from "react";

function DateSelector(props) {
  const changeHandler = (e) => {
    console.log(e.target.value);
    props.setSelectedDate(e.target.value);
  };
  return (
    <>
      <label htmlFor="start">Date:</label>
      <input
        name="start"
        type="date"
        value={props.selectedDate}
        onChange={(e) => changeHandler(e)}
      />
    </>
  );
}
export default DateSelector;
