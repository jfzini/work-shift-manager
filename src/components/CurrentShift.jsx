import React, { useState } from 'react';
import Fieldset from './TimePickerShift';
import { DateField, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

export default function CurrentShift() {
  const [startShiftValue, setStartShiftValue] = useState(DateTime.local());
  const [endShiftValue, setEndShiftValue] = useState(DateTime.local());
  const [startBreakValue, setStartBreakValue] = useState(DateTime.local());
  const [endBreakValue, setEndBreakValue] = useState(DateTime.local());

  return (
    <form>
      <DatePicker
        value={startShiftValue}
      />
      <TimePicker
        label='Horário de entrada'
        value={startShiftValue}
        onChange={(newValue) => setStartShiftValue(newValue)}
      />
      <TimePicker
        label='Início do Intervalo'
        value={startBreakValue}
        onChange={(newValue) => setStartBreakValue(newValue)}
      />
      <TimePicker
        label='Final do Intervalo'
        value={endBreakValue}
        onChange={(newValue) => setEndBreakValue(newValue)}
      />
      <TimePicker
        label='Horário de Saída'
        value={endShiftValue}
        onChange={(newValue) => setEndShiftValue(newValue)}
      />
    </form>
  )
}
