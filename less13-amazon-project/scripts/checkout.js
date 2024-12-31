import { cart, removeFromCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateOrderSummary();

function updateOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productID = cartItem.productId;


        let targetProduct;
        products.forEach((product) => {
            if (product.id === productID) {
                targetProduct = product;
            }
        });

        if (cart.length !== 0) {
            cartSummaryHTML += `  
                <div class="cart-item-container">
                    <div class="delivery-date">
                        Delivery date: Tuesday, June 21
                    </div>

                    <div class="cart-item-details-grid">
                        <img class="product-image" src="${targetProduct.image}">

                        <div class="cart-item-details">
                        <div class="${targetProduct.name}">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                        </div>
                        <div class="product-price">
                            $${formatCurrency(targetProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                            Update
                            </span>
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
                        <div class="delivery-option">
                            <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${productID}">
                            <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${productID}">
                            <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${productID}">
                            <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}


document.querySelectorAll('.js-delete-button').forEach((link) => {
    link.addEventListener("click", () => {
        removeFromCart(link.dataset.productId);
        console.log(cart);
        updateOrderSummary();
    });
});

