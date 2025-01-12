import { addToCart, cart , loadFromStorage} from "../../less13-amazon-project/data/cart.js";

// unit test for addToCart
describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        // we dont want testing to change the localstorage, so we make fake code for setItem
        // spyOn has feature that records everytime a function is used.
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        // each test can have multiple expect and it will only pass if all expect passed
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

        
    });

    it('adds a new product into the cart', () => {

        // we dont want testing to change the localstorage, so we make fake code for setItem
        spyOn(localStorage, 'setItem');

        // ensure we test the code based on fixed situation which is cart is always empty.
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        // each test can have multiple expect and it will only pass if all expect passed
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});