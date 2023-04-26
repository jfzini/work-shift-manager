import React from 'react'

export default function CurrentShift() {
  return (
    <form>
      <label htmlFor="shift-hours">Defina sua jornada diária:</label>
      <input type="number" name="shift-hours" id="shift-hours"/>
    </form>
  )
}
