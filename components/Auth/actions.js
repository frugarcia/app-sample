import * as types from '../../constants/actionTypes';

export const onChangeStateAuth = user => dispatch => {
  dispatch({
    type: types.ON_CHANGE_STATE_AUTH,
    user
  })
};
