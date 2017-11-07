import * as types from '../../constants/actionTypes';
import faker from 'faker'
import nombres from '../../constants/nombres';

faker.locale = "es"

export const addUser = newUser => dispatch => {
  if (validateNewUser(newUser)) {
    dispatch({
      type: types.ADD_USER,
      newUser
    })
    dispatchMessage(dispatch, {
      action: 'positive',
      message: 'El usuario se ha creado correctamente'
    })
  } else {
    dispatchMessage(dispatch, {
      action: 'negative',
      message: 'Debe introducir correctamente los datos para crear un usuario'
    })
  }
};

export const addFakeUser = () => dispatch => {
  dispatch({
    type: types.ADD_USER,
    newUser: getFakeUser()
  })
  dispatchMessage(dispatch, {
    action: 'positive',
    message: 'El usuario se ha creado correctamente'
  })
}

export const removeUser = idx => dispatch => {
  dispatch({
    type: types.REMOVE_USER,
    idx
  })
  dispatchMessage(dispatch, {
    action: 'negative',
    message: 'El usuario se ha eliminado'
  })
}

export const validateNewUser = user => (user.gender === 'male' || user.gender === 'female') && user.user.trim().length > 10

const getFakeUser = () => {
  const randomIdx = Math.floor(Math.random() * nombres.length);
  const user = `${nombres[randomIdx].name} ${faker.name.lastName()} ${faker.name.lastName()}`;
  const gender = nombres[randomIdx].gender;
  return { user, gender };
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

