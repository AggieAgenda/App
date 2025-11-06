import Calendar from "../../pages/Calendar.jsx";
import CalendarButton from "./CalendarButton.jsx"
import React, { useState } from "react";

export default function CalendarNavBar(props) {
  const today = new Date();

  // Get number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // last day of the month
  };

  // Generate array of day numbers
  const daysInMonth = getDaysInMonth(props.month, props.year);
 

  // Handlers for navigation
  const prevMonth = () => {
    if (props.month === 0) {
      props.setMonth(11);
      props.setYear(props.year - 1);
    } else {
      props.setMonth(props.month - 1);
    }
  };

  const nextMonth = () => {
    if (props.month === 11) {
      props.setMonth(0);
      props.setYear(props.year + 1);
    } else {
      props.setMonth(props.month + 1);
    }
  };

  return (
    <nav className="flex items-center justify-between p-8">
      <div className="flex space-x-5">
        <button onClick={prevMonth}> <CalendarButton msg="&#8592;"/> </button>
        <button onClick={nextMonth}> <CalendarButton msg="&#8594;"/> </button>
      </div>
      <span className="font-semibold text-gray-700 text-2xl"> {props.months[props.month]} {props.year} </span>  
    </nav>
  );
}