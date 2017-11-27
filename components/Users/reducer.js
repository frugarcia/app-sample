import * as types from '../../constants/actionTypes';

const initialState = {
  data: [],
  message: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return Object.assign({}, state, { data: [...state.data, action.newUser] })
    case types.REMOVE_USER:
      return Object.assign({}, state, { data: state.data.filter((item, idx) => idx !== action.idx) })
    case types.CHANGE_MESSAGE:
      return Object.assign({}, state, { message: action.message })
    case types.CLEAR_MESSAGE:
      return Object.assign({}, state, { message: {} })
    default: return state
  }
};
