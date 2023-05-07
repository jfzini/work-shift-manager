import React, { useState } from 'react';
import Fieldset from './TimePickerShift';
import { DateField, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { saveShiftData } from '../services/storageHelpers';

export default function CurrentShift() {
  const [startShiftValue, setStartShiftValue] = useState(DateTime.local());
  const [endShiftValue, setEndShiftValue] = useState(DateTime.local());
  const [startBreakValue, setStartBreakValue] = useState(DateTime.local());
  const [endBreakValue, setEndBreakValue] = useState(DateTime.local());
  
  const genShiftVal = startShiftValue.c;

  const saveShift = (e) => {
    e.preventDefault();
    const shiftStart = {
      hour: genShiftVal.hour,
      minute: genShiftVal.minute,
    };
    const breakStart = {
      hour: startBreakValue.c.hour,
      minute: startBreakValue.c.minute,
    };
    const breakEnd = {
      hour: endBreakValue.c.hour,
      minute: endBreakValue.c.minute,
    };
    const shiftEnd = {
      hour: endShiftValue.c.hour,
      minute: endShiftValue.c.minute,
    };
    const shiftData = {
      [`${genShiftVal.day}-${genShiftVal.month}-${genShiftVal.year}`]: {
        shiftStart,
        breakStart,
        breakEnd,
        shiftEnd,
      },
    };
    saveShiftData(shiftData);
  };

  const getShift = () => {
    const prevData = localStorage.getItem('shiftData');
    if (prevData) {
      const parsedPrevData = JSON.parse(prevData);
      const daysList = parsedPrevData.map((el) => Object.keys(el)[0])
      const curDay = daysList.indexOf(`${genShiftVal.day}-${genShiftVal.month}-${genShiftVal.year}`)
      console.log(parsedPrevData[curDay]);
    }
  }

  getShift();

  return (
    <form>
      <DatePicker value={startShiftValue} onChange={(newValue) => setStartShiftValue(newValue)} />
      <TimePicker
        label="Horário de entrada"
        value={startShiftValue}
        onChange={(newValue) => setStartShiftValue(newValue)}
      />
      <TimePicker
        label="Início do Intervalo"
        value={startBreakValue}
        onChange={(newValue) => setStartBreakValue(newValue)}
      />
      <TimePicker
        label="Final do Intervalo"
        value={endBreakValue}
        onChange={(newValue) => setEndBreakValue(newValue)}
      />
      <TimePicker
        label="Horário de Saída"
        value={endShiftValue}
        onChange={(newValue) => setEndShiftValue(newValue)}
      />
      <button onClick={saveShift}>Salvar</button>
    </form>
  );
}
