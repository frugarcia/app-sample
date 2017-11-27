import * as types from '../../constants/actionTypes';

export const removeFromCart = id => dispatch => {
 return dispatch({ type: types.REMOVE_CART, id })
}

export const addToCart = id => dispatch => {
  return dispatch({ type: types.ADD_CART, id })
};
