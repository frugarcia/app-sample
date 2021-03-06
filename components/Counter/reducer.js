import * as types from '../../constants/actionTypes';

const initialState = {
  asyncStart: false,
  result: 8
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LAUNCH_OPERATION:
      return Object.assign({}, state, { result: newOperation(state.result, action.operation) })
    case types.TIMER_START:
      return Object.assign({}, state, { asyncStart: true })
    case types.TIMER_TICK:
      return Object.assign({}, state, { result: state.result + 1 })
    case types.TIMER_PAUSE:
      return Object.assign({}, state, { asyncStart: false })
    case types.TIMER_STOP:
      return Object.assign({}, state, { result: 0, asyncStart: false })
    default: return state
  }
};

const newOperation = (state, operation) => {
  switch (operation) {
    case 'suma':
      return state + 1
    case 'resta':
      return state ? state - 1 : state
    case 'duplica':
      return state * 2
    case 'reset':
      return 0
    default: return state
  }
};
