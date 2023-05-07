export const saveShiftData = (shiftData) => {
  const prevData = localStorage.getItem('shiftData');
  const parsedPrevData = prevData ? JSON.parse(prevData) : []
  const shiftDataStringified = JSON.stringify([...parsedPrevData, shiftData]);
  localStorage.setItem('shiftData', shiftDataStringified);
}