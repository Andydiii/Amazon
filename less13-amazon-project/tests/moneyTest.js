import { formatCurrency } from "../scripts/utils/money.js";

console.log('test Suite: formatCurrency');

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

