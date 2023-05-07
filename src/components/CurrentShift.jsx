import React, { useState } from 'react';
import Fieldset from './TimePickerShift';
import { DateField, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { saveShiftData } from '../services/storageHelpers';
import { CURRENT_SHIFT } from './data/currentShiftData';

export default function CurrentShift() {
  const [value, setValue] = useState({ SHIFT_START: DateTime.local() });

  const saveShift = (e) => {
    e.preventDefault();
    saveShiftData(value);
  };

  const getCurDate = () => {
    const curMonth =
      value.SHIFT_START.c.month >= 10
        ? value.SHIFT_START.c.month
        : `0${value.SHIFT_START.c.month}`;
    const curDay =
      value.SHIFT_START.c.day >= 10
        ? value.SHIFT_START.c.day
        : `0${value.SHIFT_START.c.day}`;
    return `${value.SHIFT_START.c.year}-${curMonth}-${curDay}`;
  };

  const calcShift = () => {
    const prevData = localStorage.getItem('shiftData');
    if (prevData) {
      const parsedPrevData = JSON.parse(prevData);
      const teste = parsedPrevData.map((date) => {
        const shiftStart = new Date(date.SHIFT_START);
        const breakStart = new Date(date.BREAK_START);
        const breakEnd = new Date(date.BREAK_END);
        const shiftEnd = new Date(date.SHIFT_END);

        const shiftDuration = (shiftEnd - shiftStart) / (1000 * 60 * 60);
        const breakDuration = (breakEnd - breakStart) / (1000 * 60 * 60);

        const hoursWorked = shiftDuration - breakDuration;

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const testString = shiftStart.toLocaleDateString('pt-br', options);
        return {[testString]: hoursWorked.toFixed(2)}
      });
      console.log(teste);
    }
  };

  calcShift()

  // const getShift = () => {
  //   const prevData = localStorage.getItem('shiftData');
  //   if (prevData) {
  //     const parsedPrevData = JSON.parse(prevData);
  //     const savedDates = parsedPrevData.map(({ SHIFT_START }) => SHIFT_START);
  //     const curDate = getCurDate()
  //     const testbool = savedDates.find((date) => date.includes(curDate))
  //   }
  // };

  // getShift();

  return (
    <form>
      <DatePicker
        value={value.SHIFT_START}
        onChange={(newValue) => setValue({ ...value, SHIFT_START: newValue })}
      />
      {CURRENT_SHIFT.map(({ label, id }) => (
        <TimePicker
          key={id}
          label={label}
          value={value[id] ? value[id] : ''}
          onChange={(newValue) => setValue({ ...value, [id]: newValue })}
        />
      ))}
      <button onClick={saveShift}>Salvar</button>
    </form>
  );
}
