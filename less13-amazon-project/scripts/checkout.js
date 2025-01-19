import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/backend-practice.js';

// for 17a
import { Car, newToyota, newTesla } from "../../less17-OOP/practices/data/car.js";

renderOrderSummary();
renderPaymentSummary();


// for 17a
console.log(newToyota);
console.log(newTesla);

// 17b
newToyota.displayInfo();
newTesla.displayInfo();


// 17c
newToyota.go();
newToyota.go();
newToyota.displayInfo();
newToyota.reset();

newTesla.go();
newTesla.brake();
newTesla.displayInfo();
newTesla.reset();

// 17d
newToyota.displayInfo();
newTesla.displayInfo();

newToyota.openTrunk();
newToyota.displayInfo();

newToyota.go();
newToyota.closeTrunk();
newToyota.go();
newToyota.displayInfo();
newToyota.openTrunk();

