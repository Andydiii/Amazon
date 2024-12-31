export const cart = [];

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
  }
