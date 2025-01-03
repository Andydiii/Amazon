import {cart, addToCart} from "../data/cart.js";
// import * as cartModule from "../data/cart.js" is also good.
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateIconQuantity();

// to add each product into amazon project
let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container"> 
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;


//updateIconQuantity
function updateIconQuantity() {
  // update the total quantities on the cart icon.
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
}


// showAdded is when we click add, then pop up
let timeoutIdObj = {};

function showAdded(productId) {
  // show the msg "added" on the page
  const addedToCartEle = document.querySelector(`.js-added-to-cart-${productId}`);
  addedToCartEle.classList.add('js-added-to-cart-show');

  // extend the time for added to cart 2 more seconds
  if (timeoutIdObj[productId]) {
    // extend remaining time
    clearTimeout(timeoutIdObj[productId]);
  }
  
  let timeOutId = setTimeout(() => {
    addedToCartEle.classList.remove('js-added-to-cart-show');
  }, 2000);

  timeoutIdObj[productId] = timeOutId;
}

// functionality/interation for clicking the add button
document.querySelectorAll('.js-add-to-cart').forEach((buttonEle) => {
    buttonEle.addEventListener('click', () => {
        // the button ID clicked by user
        const {productId} = buttonEle.dataset;
        
        // calculate the quantity when we clicked addToCart button
        addToCart(productId);

        // update cart icon quantity
        updateIconQuantity();

        // show "Added" pop up to tell user product is added to cart.
        showAdded(productId);
    });
});
