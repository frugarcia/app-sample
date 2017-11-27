//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { formatNumber } from 'accounting-js';
import { Transition, Grid, Label, Button, Divider, Segment, Radio } from 'semantic-ui-react';

//Components
import Layout from '../components/Layout';
import CounterSync from '../components/Counter/CounterSync'
import CounterAsync from '../components/Counter/CounterAsync'

const Counter = ({ url, counter }) => {
  return (
    <Layout url={url}>
      <h2>Resultado del contador</h2>
      <Segment inverted style={{width: "300px"}} textAlign="center">
       <h1>{formatNumber(counter.result, { precision: 0, thousand: "." })}</h1>
      </Segment>
      <Divider horizontal>Contador Síncrono</Divider>
      <CounterSync counter={counter}/>
      <Divider horizontal>Contador Asíncrono</Divider>
      <CounterAsync counter={counter}/>
    </Layout>
  )
};

const mapStateToProps = ({ counter }) => ({ counter });

export default withRedux(initStore, mapStateToProps)(Counter);
