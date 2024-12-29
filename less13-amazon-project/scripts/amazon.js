import { cart } from "../data/cart";
import { products } from "../data/products";

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
            $${(product.priceCents / 100).toFixed(2)}
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

let timeoutIdObj = {};

document.querySelectorAll('.js-add-to-cart').forEach((buttonEle) => {
    buttonEle.addEventListener('click', () => {
        // the button ID clicked by user
        const {productId} = buttonEle.dataset;
        let existedInCart;

        // quantity = 1 by default
        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
        cart.forEach((product) => {
            if (product.productId === productId) {
                
                product.quantity += quantity;
                existedInCart = true;
            }     
        });

        if (!existedInCart) {
            cart.push({
                productId,
                quantity
            });
        }

        // update the total quantities on the cart icon.
        let total = 0;
        cart.forEach((product) => {
            total += product.quantity;
        });

        document.querySelector('.cart-quantity').innerHTML = total;


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

        console.log(cart);
        console.log(total);
    });
});
