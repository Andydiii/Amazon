// start every word with a capital. use this convention for things that generate objects.
function Cart(localStorageKey) {
    const cart = {
        // property
        cartItems: undefined,
    
        // method 1
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        },
    
        // method 2
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        // calculate the quantity when we clicked addToCart button
        addToCart(productId) {
            let existedInCart;
        
            // quantity = 1 by default
            const ele = document.querySelector(`.js-quantity-selector-${productId}`);
            let quantity;
            // to make automating testing working. otherwise query selector will return null.
            if (ele === null) {
                quantity = 1;
            } else {
                quantity = Number(ele.value);
            }
    
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.quantity += quantity; 
                    existedInCart = true;
                }     
            });
        
            if (!existedInCart) {
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1' // default is 1
                });
            }
    
            this.saveToStorage();
        },
    
        // remove cartItem from cart
        removeFromCart(productID) {
            const newCart = [];
    
            this.cartItems.forEach((cartItem) => {
                // not the item we wanna delete, then add it to new cart
                if (cartItem.productId !== productID) {
                    newCart.push(cartItem);
                }
            });
    
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        // what it is for? updateTotalQuantity in both checkout.js and amazone.js
        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },
    
        // what this is for? update the cart data quantity in the backend.
        updateQuantity(productID, newQuantity) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productID) {
                    cartItem.quantity = newQuantity;
                }
            });
    
        },
    
        // update deliveryOption when user click other option(originally set to be default option 1)
        updateDeliveryOption(productId, deliveryOptionId) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = deliveryOptionId;
                    console.log(cartItem.deliveryOptionId);
                    this.saveToStorage();
                }
            })
        }
    
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();








