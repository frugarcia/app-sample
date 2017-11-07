import * as types from '../../constants/actionTypes';

const initialState = {
  url: "",
  response: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_URL_API:
      return Object.assign({}, state, { url: action.payload})
    case types.RESET_DATA_API:
      return Object.assign({}, state, { response: null })
    case types.GET_DATA_API:
      return Object.assign({}, state, {response: {
        data: action.data,
        isLoading: action.isLoading,
        isError: action.isError
      }})
    default: return state
  }
};
