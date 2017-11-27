import * as types from '../../constants/actionTypes';

const initialState = {
  isAuth: false,
  userData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_UPDATE:
      return action.user
    default: return state
  }
};
