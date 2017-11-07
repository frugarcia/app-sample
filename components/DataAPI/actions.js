import * as types from '../../constants/actionTypes';

export const handleUrlAPI = value => dispatch => {
  return dispatch({
    type: types.HANDLE_URL_API,
    payload: value
  })
};

export const getDataAPI = () => {
  return (dispatch, getState) => {
    const url = getState().dataApi.url;
    dispatch({
      type: types.GET_DATA_API,
      data: null,
      isLoading: true,
      isError: false
    })
    return fetch(url)
    .then(response => response.json())
    .then(response => dispatch({
      type: types.GET_DATA_API,
      data: response,
      isLoading: false,
      isError: false
    }))
    .catch(error => dispatch({
      type: types.GET_DATA_API,
      data: null,
      isLoading: false,
      isError: error
    }))
  }
};

export const resetDataAPI = () => {
  return dispatch => {
    dispatch({ type: types.RESET_DATA_API });
    dispatch({
      type: types.HANDLE_URL_API,
      payload: ""
    });
  }
};
