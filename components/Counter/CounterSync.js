//Dependencies
import { Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { launchOper } from './actions';

const CounterSync = ({ counter, launchOper }) => {
  return(
    <div>
      <Button color="green" onClick={() => launchOper('suma')}>Suma</Button>
      <Button disabled={!Boolean(counter)} color="orange" onClick={() => launchOper('resta')}>Resta</Button>
      <Button disabled={!Boolean(counter)} color="blue" onClick={() => launchOper('duplica')}>Duplicar</Button>
      <Button disabled={!Boolean(counter)} color="youtube" onClick={() => launchOper('reset')}>Reset</Button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  launchOper: bindActionCreators(launchOper, dispatch)
});

export default connect(null, mapDispatchToProps)(CounterSync);
