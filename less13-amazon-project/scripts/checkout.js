import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js';

// for 17a
import { Car, newToyota, newTesla } from "../../less17-OOP/practices/data/car.js";

// async = makes a function return a promise, same but short version for below one.
async function loadPage() {
    // await lets us write asynchronous code like normal code.
    await loadProductsFetch();

    renderOrderSummary();  // synchronous code so no need for await
    renderPaymentSummary();  // synchronous code so no need for await
}
loadPage();
 
/*
// main code for checkout page.
// promise: one parameter "resolve", whenver use resolve, it means we can go to next step.
loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

// for 17a
console.log(newToyota);
console.log(newTesla);

// 17b
newToyota.displayInfo();
newTesla.displayInfo();

 
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

*/