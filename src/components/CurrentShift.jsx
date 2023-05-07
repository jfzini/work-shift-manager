import React, { useState } from 'react';
import Fieldset from './TimePickerShift';
import { DateField, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { getShiftDuration, saveShiftData } from '../services/storageHelpers';
import { CURRENT_SHIFT } from './data/currentShiftData';

export default function CurrentShift() {
  const [value, setValue] = useState({ SHIFT_START: DateTime.local() });
  //USAR A DATA NO FORMATO DD/MM/YYYY COMO CHAVE PARA O LOCAL STORAGE 
  const saveShift = (e) => {
    e.preventDefault();
    saveShiftData(value);
    calcShift();
  };

  const calcShift = () => {
    const prevData = localStorage.getItem('shiftData');
    if (prevData) {
      const parsedPrevData = JSON.parse(prevData);
      const shiftHistory = parsedPrevData.map((date) => getShiftDuration(date));
    }
  };

  return (
    <form>
      {/*The date inserted below will overwrite the current date if the user wants to save a past date*/}
      <DatePicker
        value={value.SHIFT_START}
        onChange={(newValue) => setValue({
          ...value,
          SHIFT_START: newValue,
          BREAK_START: newValue,
          BREAK_END: newValue,
          SHIFT_END: newValue,
        })}
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
