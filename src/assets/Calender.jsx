import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
// import './customCalendar.css'; // custom styles here

const MedicationCalendar = () => {
  const [value, setValue] = useState(new Date());

  // Example dates (in real app, fetch from DB or state)
  const takenDates = ["2025-06-01", "2025-06-02", "2025-06-03"];
  const missedDates = ["2025-06-04", "2025-06-05", "2025-06-06"];

  const formatDate = (date) => date.toISOString().split('T')[0];

  const tileContent = ({ date }) => {
    const formatted = formatDate(date);
    if (takenDates.includes(formatted)) {
      return <div className="dot taken" />;
    } else if (missedDates.includes(formatted)) {
      return <div className="dot missed" />;
    } else if (formatDate(new Date()) === formatted) {
      return <div className="dot today" />;
    }
    return null;
  };

  return (
    <div className="rounded-xl p-4 bg-white shadow-md">
      {/* <h2 className="text-lg font-bold mb-4">Medication Calendar</h2> */}
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
      />
{/* 
      <div className="flex justify-around text-sm mt-4">
        <div className="flex items-center gap-2"><span className="dot taken" /> Medication taken</div>
        <div className="flex items-center gap-2"><span className="dot missed" /> Missed medication</div>
        <div className="flex items-center gap-2"><span className="dot today" /> Today</div>
      </div> */}
    </div>
  );
};

export default MedicationCalendar;
