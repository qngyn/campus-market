import axios from 'axios';
import { CART_ADD_ITEM } from '../contstants/CartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name, 
            image: data.image, 
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); // localStorage only accepts strings
}