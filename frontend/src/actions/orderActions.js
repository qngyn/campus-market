import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../contstants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => { // id here stands for 'profile' -- subject to change
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });
        
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? // error.response.data.message is the custom error message sent from the backend
                error.response.data.message : error.message
        });
    }
}