export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
    
}];

// calculate the quantity when we clicked addToCart button
export function addToCart(productId) {
    let existedInCart;
  
    // quantity = 1 by default
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity += quantity;
            existedInCart = true;
        }     
    });
  
    if (!existedInCart) {
        cart.push({
            productId,
            quantity
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


export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productID, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productID) {
            cartItem.quantity = newQuantity;
        }
    });
}
