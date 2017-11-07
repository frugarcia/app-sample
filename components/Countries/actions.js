import * as types from '../../constants/actionTypes';
import _ from 'lodash';

export const resetSearch = () => dispatch => {
  return dispatch({ type: types.RESET_SEARCH })
}

export const countrySearch = searchValue => dispatch => {
  dispatch({ type: types.SEARCH_COUNTRY })
  setTimeout(()=>{
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(response => {
        const addaptResponse = arrayForSearch(response, searchValue)
        dispatch({
          type: types.SEARCH_COUNTRY_OK,
          response: addaptResponse,
          statusResponse: addaptResponse.length ? "OK" : "EMPTY" })
      })
      .catch(err => dispatch({ type: types.SEARCH_COUNTRY_ERROR }))
  }, 1000)
};

const arrayForSearch = (countries, searchValue) => {
  const addaptArray =  countries.map(country => Object.assign({}, country, {
    ...country,
    searchNames: [ ..._.map(country.translations).filter(translation => translation !== null), country.name]
    })
  );
  return addaptArray.filter(
    country => country.searchNames.find(value => {
      return value.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })
  )
};
