import * as types from '../../constants/actionTypes';

export const authUpdate = user => dispatch => {
  dispatch({
    type: types.AUTH_UPDATE,
    user: {
      isAuth: user !== null,
      userData: user
    }
  })
};
