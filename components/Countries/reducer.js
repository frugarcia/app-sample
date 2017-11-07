import * as types from '../../constants/actionTypes';

const initialState = {
  statusResponse: null,
  isLoading: false,
  response: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_SEARCH:
      return initialState
    case types.SEARCH_COUNTRY:
      return Object.assign({}, state, { isLoading: true, response: null, statusResponse: null })
    case types.SEARCH_COUNTRY_OK:
      return Object.assign({}, state, {
        response: action.response,
        isLoading: false,
        statusResponse: action.statusResponse
      })
    case types.SEARCH_COUNTRY_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        statusResponse: "ERROR",
        response: null
      })
    default: return state
  }
};
