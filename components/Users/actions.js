import * as types from '../../constants/actionTypes';
import generateFakeUser from '../../lib/generateFakeUser'

export const addUser = newUser => dispatch => {
    dispatch({
      type: types.ADD_USER,
      newUser
    });
    dispatchMessage(dispatch, {
      action: 'positive',
      message: 'El usuario se ha creado correctamente'
    });
};

export const addFakeUser = gender => dispatch => {
  dispatch({
    type: types.ADD_USER,
    newUser: generateFakeUser(gender)
  })
  dispatchMessage(dispatch, {
    action: 'positive',
    message: 'El usuario se ha creado correctamente'
  })
};

export const alertUserLogin = () => dispatch => {
  dispatchMessage(dispatch, {
    action: 'negative',
    message: 'Debe estar logueado para usar esta opción'
  })
};

export const removeUser = idx => dispatch => {
  dispatch({
    type: types.REMOVE_USER,
    idx
  })
  dispatchMessage(dispatch, {
    action: 'negative',
    message: 'El usuario se ha eliminado correctamente'
  })
}

let timer = null

const dispatchMessage = (dispatch, message) => {
  clearTimeout(timer)
  dispatch({
    type: types.CHANGE_MESSAGE,
    message
  })
  timer = setTimeout(() => dispatch({ type: types.CLEAR_MESSAGE }), 3000)
};

