import * as types from '../../constants/actionTypes';

let timer = null;

export const launchOper = operation => dispatch => {
  return dispatch({
    type: types.LAUNCH_OPERATION,
    operation
  })
};

export const handleAsync = isAsync => dispatch => {
  dispatch({
    type: types.HANDLE_ASYNC_COUNTER,
    isAsync
  });
  clearInterval(timer);
  dispatch({ type: types.TIMER_PAUSE })
};

export const startAsync = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: types.TIMER_START });
  dispatch(tick())
};

const tick = () => ({ type: types.TIMER_TICK });

export const pauseAsync = () => dispatch => {
  clearInterval(timer);
  return dispatch({ type: types.TIMER_PAUSE })
}

export const stopAsync = () => dispatch => {
  clearInterval(timer);
  return dispatch({ type: types.TIMER_STOP })
};

