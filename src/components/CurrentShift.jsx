import React, { useState } from 'react';
import Fieldset from './Fieldset';
import { CURRENT_SHIFT } from './data/currentShiftData';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

export default function CurrentShift() {
  const [value, setValue] = useState(DateTime.local());

  return (
    <form>
      <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      {CURRENT_SHIFT.map(({legend, id}) => (
        <Fieldset legend={legend} id={id} key={id} />
      ))}
    </form>
  )
}
