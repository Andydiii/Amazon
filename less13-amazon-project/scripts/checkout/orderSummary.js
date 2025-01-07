// Named export
import { cart, removeFromCart, saveToStorage, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// ESM version of library: with export so we wont have naming conflict
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// default export 
//  only allows one thing to export like below.
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
// import '../data/backend-practice.js'

hello();

const today = dayjs();
const deliveryDate1 = today.add(7, 'day');
console.log(deliveryDate1.format('dddd, MMMM D'));

export function renderOrderSummary() {
    updateTotalQuantity();
    
    // update the checkout total item quantity
    function updateTotalQuantity() {
        const quantity = calculateCartQuantity();

        document.querySelector('.js-return-to-home-link').innerHTML = `${quantity}`;
    }

    // checkout summary html
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productID = cartItem.productId;


        const targetProduct = getProduct(productID);

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const arriveDay = today.add(deliveryOption.deliveryDays, 'day');
        const arriveDay_format = arriveDay.format('dddd, MMMM D');

        cartSummaryHTML += `  
            <div class="cart-item-container js-item-container-${targetProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${arriveDay_format}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${targetProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${targetProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(targetProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${targetProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${targetProduct.id}">
                            Update
                        </span>
                        <input class="quantity-input js-quantity-input-${targetProduct.id}"></input>
                        <span class="save-quantity-link link-primary" data-product-id = "${targetProduct.id}">Save</span>
                        <span class="delete-quantity-link link-primary 
                        js-delete-button" data-product-id = "${targetProduct.id}">
                            Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(targetProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // delete the item from the cart whenever we click 'delete'
    document.querySelectorAll('.js-delete-button').forEach((link) => {
        link.addEventListener("click", () => {
            const productID = link.dataset.productId;
            // remove the cart item in cart
            removeFromCart(productID);

            // store the current cart item in localstorage
            saveToStorage();
            
            // console.log(document.querySelector(`.js-item-container-${productID}`));
            document.querySelector(`.js-item-container-${productID}`).remove();

            // update the total quantity shown on the header
            updateTotalQuantity();

            // update information in payment part
            renderPaymentSummary();
        });
    });

    // when click update, there will be a input box and a save button.
    document.querySelectorAll('.js-update-quantity-link').forEach((updateEle) => {
        updateEle.addEventListener('click', () => {
            document.querySelector(`.js-item-container-${updateEle.dataset.productId}`).classList.add('is-editing-quantity');
        });
    });

    // when click save, save button and input box disapper and only update button is there.
    document.querySelectorAll('.save-quantity-link').forEach((saveEle) => {
        saveEle.addEventListener('click', () => {
            // ID stored in web
            const productID = saveEle.dataset.productId;

            // get new updated quantity
            const newQuantity = Number(document.querySelector(`.js-quantity-input-${productID}`).value);
            
            // find the item in the cart and update quantity in the cart 
            updateQuantity(productID, newQuantity);

            // update web quantity 
            document.querySelector(`.js-quantity-label-${productID}`).innerHTML = `${newQuantity}`;

            // update total quantity in the checkout header
            updateTotalQuantity();

            // store the cart in localstorage
            saveToStorage();

            // 'save' button disapper
            const itemContainer = document.querySelector(`.js-item-container-${productID}`)
            itemContainer.classList.remove('is-editing-quantity');

            // update information on payment part;
            renderPaymentSummary();
        });
    });

    // generat HTML for 3 delivery method for a cartItem
    function deliveryOptionsHTML(targetProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const arriveDay = today.add(deliveryOption.deliveryDays, 'day');
            const arriveDay_format = arriveDay.format('DD-MMMM-YYYY');
            
            const priceDolloar = formatCurrency(deliveryOption.priceCents);
            const priceDolloar_format = priceDolloar === 0 ? 'FREE': `$${priceDolloar} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

            html += 
            `<div class="delivery-option js-delivery-option"
                data-product-id = "${targetProduct.id}" 
                data-delivery-id = "${deliveryOption.id}">
                <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${targetProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${arriveDay_format}
                    </div>
                    <div class="delivery-option-price">
                        ${priceDolloar_format} Shipping 
                    </div>
                </div>
            </div>`
        });    
        return html;
    }

    // each radio button(delivery method) is clickable and click each one will update the delivery id of cart item change.
    document.querySelectorAll('.js-delivery-option').forEach((deliveryMethodEle) => {
        deliveryMethodEle.addEventListener('click', () => {
            const {productId, deliveryId} = deliveryMethodEle.dataset;
            updateDeliveryOption(productId, deliveryId);
            renderOrderSummary();
        });
    });
}
