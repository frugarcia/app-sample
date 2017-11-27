//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { Container } from 'semantic-ui-react';

//Components
import Layout from '../components/Layout';

export default withRedux(initStore)(({ url }) => (
  <Layout url={url}>
    <Container text textAlign="center">
      <h1>appSample</h1>
      <p style={{ textAlign: "left" }}>Esta página está dedicada a utilizar los conceptos aprendidos, utilizando las siguientes tecnologías:</p>
    </Container>
  </Layout>
));
