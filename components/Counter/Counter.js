
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { launchOper, handleAsync, startAsync, pauseAsync, stopAsync } from './actions';
import { formatNumber } from 'accounting-js';
import { Transition, Grid, Label, Button, Divider, Segment, Radio } from 'semantic-ui-react';

const Counter = ({ mainStyles, launchOper, handleAsync, startAsync, pauseAsync, stopAsync, counter }) => {
  return (
    <div style={mainStyles}>
      <h2>{ counter.isAsync ? "Contador asíncrono" : "Contador" }</h2>
      <Segment>
        El resultado del contador es <b style={{fontSize: "1.3em"}} >{formatNumber(counter.result, { precision: 0, thousand: "." })}</b>
      </Segment>
      <Grid>
        <Grid.Column floated="left" width={10}>
        {
          !counter.isAsync ?
          <Button.Group size="small">
            <Button color="green" onClick={() => launchOper('suma')}>Suma</Button>
            <Button disabled={!Boolean(counter)} color="orange" onClick={() => launchOper('resta')}>Resta</Button>
            <Button disabled={!Boolean(counter)} color="blue" onClick={() => launchOper('duplica')}>Duplicar</Button>
            <Button disabled={!Boolean(counter)} color="youtube" onClick={() => launchOper('reset')}>Reset</Button>
          </Button.Group>
          :
          <Button.Group size="small">
            {
              counter.asyncStart ?
              <Button onClick={pauseAsync} icon='pause' />
              :
              <Button onClick={startAsync} icon='play' />
            }
            <Button onClick={stopAsync} icon='stop' />
          </Button.Group>
        }
        </Grid.Column>
        <Grid.Column floated="right" width={6} textAlign="right">
          <Label pointing='right' size="medium">¿Asíncrono?</Label>
          <Radio slider style={{position: "relative", top: "20%", }} onChange={(e, i) => handleAsync(i.checked) }/>
        </Grid.Column>
      </Grid>
      <Divider horizontal>Contador</Divider>
    </div>
  )
};

const mapStateToProps = ({ counter }) => ({ counter });

const mapDispatchToProps = dispatch => ({
  launchOper: bindActionCreators(launchOper, dispatch),
  handleAsync: bindActionCreators(handleAsync, dispatch),
  startAsync: bindActionCreators(startAsync, dispatch),
  pauseAsync: bindActionCreators(pauseAsync, dispatch),
  stopAsync: bindActionCreators(stopAsync, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
