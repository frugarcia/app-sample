import * as types from '../../constants/actionTypes';
import _ from 'lodash';

export const resetSearch = () => dispatch => dispatch({ type: types.RESET_SEARCH });

export const loadAllCountries = () => dispatch => {
  dispatch({ type: types.LOAD_COUNTRIES })
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(response => dispatch({
          type: types.LOAD_COUNTRIES_OK,
          response: response,
          statusResponse: response.length ? "OK" : "EMPTY" })
      )
      .catch(err => dispatch({ type: types.LOAD_COUNTRIES_ERROR }))
};

export const filterCountries = (searchValue) => (dispatch, getState) => {
  const countries = getState().countries.data;
  const addaptArray =  countries.map(country => Object.assign({}, country, {
    ...country,
    searchNames: [ ..._.map(country.translations).filter(translation => translation !== null), country.name]
    })).filter(country =>
      country.searchNames.find(value => {
      return _.deburr(value.toLowerCase().trim()).indexOf(_.deburr(searchValue.toLowerCase().trim())) !== -1
    })
  );

  return dispatch({
    type: types.FILTER_COUNTRIES,
    response: addaptArray
  })
};
