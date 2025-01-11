export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

// calculate the quantity when we clicked addToCart button
export function addToCart(productId) {
    let existedInCart;
  
    // quantity = 1 by default
    const ele = document.querySelector(`.js-quantity-selector-${productId}`)
    let quantity;
    // to make automating testing working. otherwise query selector will return null.
    if (ele === null) {
        quantity = 1;
    } else {
        quantity = Number(ele.value);
    }

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity += quantity; 
            existedInCart = true;
        }     
    });
  
    if (!existedInCart) {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1' // default is 1
        });
    }

    saveToStorage();
}

// remove cartItem from cart
export function removeFromCart(productID) {
    const newCart = [];

    cart.forEach((cartItem) => {
        // not the item we wanna delete, then add it to new cart
        if (cartItem.productId !== productID) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// what it is for? updateTotalQuantity in both checkout.js and amazone.js
export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

// what this is for? update the cart data quantity in the backend.
export function updateQuantity(productID, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productID) {
            cartItem.quantity = newQuantity;
        }
    });
}


// update deliveryOption when user click other option(originally set to be default option 1)
export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.deliveryOptionId = deliveryOptionId;
            console.log(cartItem.deliveryOptionId);
            saveToStorage();
        }
    })
}
