import { cart } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { calculateCartQuantity } from "../../data/cart.js";

export function renderPaymentSummary() {
    let productPriceTotalCents = 0;
    let shippingCents = 0;

    cart.forEach((cartItem) => {
        const productID = cartItem.productId;
        const deliveryID = cartItem.deliveryOptionId;
        const targetProduct = getProduct(productID);

        const priceCents = targetProduct.priceCents;
        const quantity = cartItem.quantity;

        productPriceTotalCents += quantity * priceCents;
        
        const targetDeliveryOption = getDeliveryOption(deliveryID);
        shippingCents += targetDeliveryOption.priceCents;
    });

    const totalBeforeTaxCents = (productPriceTotalCents + shippingCents);
    const tax = totalBeforeTaxCents * 0.13;
    const totalCents = totalBeforeTaxCents + tax;

    const totalQuantity = calculateCartQuantity();

    const paymentSummaryHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}