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

  const saveShift = (e) => {
    e.preventDefault();
    const genShiftVal = startShiftValue.c;
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
