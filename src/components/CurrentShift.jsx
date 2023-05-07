import React, { useState } from 'react';
import Fieldset from './TimePickerShift';
import { DateField, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { getShiftDuration, saveToLocalStorage } from '../services/storageHelpers';
import { CURRENT_SHIFT } from './data/currentShiftData';

export default function CurrentShift() {
  const [value, setValue] = useState({ SHIFT_START: DateTime.local() });
  const [overshift, setOvershift] = useState(0)
  //USAR A DATA NO FORMATO DD/MM/YYYY COMO CHAVE PARA O LOCAL STORAGE 
  const saveShift = (e) => {
    e.preventDefault();
    saveToLocalStorage('shiftData', value);
    calcShift();
  };

  const calcShift = () => {
    const prevData = localStorage.getItem('shiftData');
    if (prevData) {
      const parsedPrevData = JSON.parse(prevData);
      const shiftHistory = parsedPrevData.map((date) => getShiftDuration(date));
      saveToLocalStorage('shiftHistory', shiftHistory);
      calcOvershift(shiftHistory);
    }
  };

  const calcOvershift = (shiftHistory) => {
    const shiftDuration = Object.values(shiftHistory[shiftHistory.length - 1])[0];
    let overshiftValue = (shiftDuration - 8) * 60;
    overshiftValue = overshiftValue > 10 ? overshiftValue : 0;
    setOvershift(overshiftValue.toFixed(2));
  };

  return (
    <>
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
      {overshift > 0 && <h3>Você trabalhou {overshift} minutos extras</h3>}
      {overshift < 0 && <h3>Você trabalhou {Math.abs(overshift)} minutos a menos</h3>}
    </>
  );
}
