import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend3 from './isweekend.js';
// 15a
const today = new dayjs();
const five_days_later = today.add(5, 'day');
console.log(five_days_later.format('MMMM DD'));

// 15b
const aMonthLater = today.add(1, 'month');
console.log(aMonthLater.format('MMMM DD'));

// 15c
const aMonthBefore = today.subtract(1, 'month');
console.log(aMonthBefore.format('MMMM DD'));

// 15d
console.log(today.format('dddd'));

// 15e
function isWeekend(date) {
    if (date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday') {
        return true;
    }
    return false;
}

console.log('##############################');
const test1 = dayjs('2025-01-07 19:18');
console.log(isWeekend(test1));
console.log(isWeekend(test1.add(4, 'day')));
console.log(isWeekend(test1.add(5, 'day')));


// 15f
console.log(isWeekend3(test1));
console.log(isWeekend3(test1.add(4, 'day')));
console.log(isWeekend3(test1.add(5, 'day')));

// 15g
console.log(isWeekend3(test1));
console.log(isWeekend3(test1.add(4, 'day')));
console.log(isWeekend3(test1.add(5, 'day')));