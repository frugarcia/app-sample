import * as types from '../../constants/actionTypes';

const initialState = {
  data: [],
  filterData: [],
  isLoading: true,
  response: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_SEARCH:
      return Object.assign({}, state, { isLoading: false, statusResponse: "OK", filterData: state.data })
    case types.LOAD_COUNTRIES:
      return Object.assign({}, state, { isLoading: true, statusResponse: null })
    case types.LOAD_COUNTRIES_OK:
      return Object.assign({}, state, {
        data: action.response,
        filterData: action.response,
        isLoading: false,
        statusResponse: action.statusResponse
      })
    case types.LOAD_COUNTRIES_ERROR:
      return Object.assign({}, state, {
        isLoading: false, statusResponse: "ERROR"
      })
    case types.FILTER_COUNTRIES:
      return Object.assign({}, state, {
        isLoading: false, statusResponse: "OK", filterData: action.response
      })

    default: return state
  }
};
