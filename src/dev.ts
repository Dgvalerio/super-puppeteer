import { differenceInMinutes, parse } from 'date-fns';

import { days } from '../markdowns/td';

console.log(
  days.map((d) => {
    const time = d.time[0];
    const difference = differenceInMinutes(
      parse(time.final, 'HH:mm', new Date()),
      parse(time.initial, 'HH:mm', new Date())
    );

    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;

    return { ...time, difference: `${hours}:${minutes}` };
  })
);

const total = days.reduce((previous, current) => {
  const time = current.time[0];
  const difference = differenceInMinutes(
    parse(time.final, 'HH:mm', new Date()),
    parse(time.initial, 'HH:mm', new Date())
  );

  return previous + difference;
}, 0);
const hours = Math.floor(total / 60);
const minutes = total % 60;

console.log(`${hours}:${minutes}`);
