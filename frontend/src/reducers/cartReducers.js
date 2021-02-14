import { CART_ADD_ITEM } from "../contstants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existingItem = state.cartItems.find((cartItem) => cartItem.productId == item.productId);

            if (existingItem) { // if item already in cart
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.productId === existingItem.productId ? item : cartItem) // update item in cart
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        default:
            return state;
    }
}