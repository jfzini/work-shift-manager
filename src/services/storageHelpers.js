export const saveShiftData = (shiftData) => {
  const prevData = localStorage.getItem('shiftData');
  const parsedPrevData = prevData ? JSON.parse(prevData) : [];
  const shiftDataStringified = JSON.stringify([...parsedPrevData, shiftData]);
  localStorage.setItem('shiftData', shiftDataStringified);
};

export const getShiftDuration = (shiftData) => {
  const shiftStart = new Date(shiftData.SHIFT_START);
  const breakStart = new Date(shiftData.BREAK_START);
  const breakEnd = new Date(shiftData.BREAK_END);
  const shiftEnd = new Date(shiftData.SHIFT_END);
  
  const shiftDuration = (shiftEnd - shiftStart) / (1000 * 60 * 60);
  const breakDuration = (breakEnd - breakStart) / (1000 * 60 * 60);
  
  const hoursWorked = shiftDuration - breakDuration;
  
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const testString = shiftStart.toLocaleDateString('pt-br', options);
  return { [testString]: hoursWorked.toFixed(2) };
};
