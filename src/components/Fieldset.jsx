import React from 'react';

export default function Fieldset({ legend, id }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <label htmlFor={`${id}-hours`}>Horas:</label>
      <input type="number" name={`${id}-hours`} id={`${id}-hours`} />
      <label htmlFor={`${id}-minutes`}>Minutos:</label>
      <input type="number" name={`${id}-minutes`} id={`${id}-minutes`} />
    </fieldset>
  );
}
