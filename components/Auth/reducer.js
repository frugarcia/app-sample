import * as types from '../../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.ON_CHANGE_STATE_AUTH:
      return action.user
    default: return state
  }
};
