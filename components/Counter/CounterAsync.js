//Dependencies
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startAsync, pauseAsync, stopAsync } from './actions';

const CounterAsync = ({ counter, startAsync, pauseAsync, stopAsync }) => {
  return(
    <div>
      <p>Suma 1 cada segundo</p>
      <Button disabled={!counter.asyncStart} onClick={pauseAsync} icon='pause' />
      <Button disabled={counter.asyncStart} onClick={startAsync} icon='play' />
      <Button onClick={stopAsync} icon='stop' />
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  startAsync: bindActionCreators(startAsync, dispatch),
  pauseAsync: bindActionCreators(pauseAsync, dispatch),
  stopAsync: bindActionCreators(stopAsync, dispatch)
});

export default connect(null, mapDispatchToProps)(CounterAsync);
