import _ from 'lodash';

// Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import 'isomorphic-fetch';
import { Dimmer, Loader } from 'semantic-ui-react';

//Components
import Layout from '../components/Layout';

const Country = ({ country }) => {
  const response = {
    isLoading: Boolean(!country),
    data: country,
    isError: country.status && country.status === 404
  }
  return (
    <Layout url={{ pathname: '/countries' }}>
      {
      response.isLoading ?
      <Dimmer active inverted>
        <Loader size='large'>Cargando datos...</Loader>
      </Dimmer> :
        response.isError ? <h1>Error</h1> : <pre>{JSON.stringify(response.data, null, 2)}</pre>
      }
    </Layout>
  )
};

Country.getInitialProps = async ({ query: {alphaCode} }) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
  const country = await res.json()
  return { country } || {}
}

export default withRedux(initStore)(Country);
