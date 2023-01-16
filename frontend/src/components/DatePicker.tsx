import React, { useState, ChangeEvent } from "react";
import { DateTime } from "luxon";
import { DayPicker } from "react-day-picker";

type DatePickerProps={
  value: Date;
  setValue: Function;

}

export default function DatePicker({ value, setValue }: DatePickerProps) {
  const convertEventToDate= (event: ChangeEvent<HTMLInputElement>|undefined): Date=> event ? new Date(event.target.value||value) : new Date();
  const setDate = (e: Date|undefined) => {
    const date = DateTime.fromJSDate(e ? e : new Date()).toISODate();
    setValue(date);
    setShowCalendar(false);
  };
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div className="w-full">
      {showCalendar && (
        <div
          className="fade absolute w-full h-full z-50 top-0 left-0"
          onClick={() => setShowCalendar(false)}
        />
      )}
      <div className="relative">
        <input
          type="date"
          className="border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:ring-1"
          id="username"
          value={value.toString()}
          onChange={(e) => setDate(convertEventToDate(e))}
          onClick={(e) => {
            e.preventDefault();
            setShowCalendar(!showCalendar);
          }}
        />

        {showCalendar && (
          <DayPicker
            fromYear={2015}
            toYear={2025}
            selected={value}
            captionLayout="dropdown"
            className="border rounded p-3 absolute right-0 bg-white z-50"
            onSelect={(e) => setDate(e)}
            mode="single"
          />
        )}
      </div>
    </div>
  );
}
