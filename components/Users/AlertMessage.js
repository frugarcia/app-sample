//Dependencies
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Message, Transition } from 'semantic-ui-react';

const AlertMessage = ({ dataMessage }) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <Transition.Group animation="fade up" duration={500}>
        { !isEmpty(dataMessage) ?
            <Message positive={dataMessage.action === "positive"} negative={dataMessage.action === "negative"} size="small" content={dataMessage.message}/>
        : null }
      </Transition.Group>
    </div>
  )
};

AlertMessage.propTypes = {
  dataMessage: PropTypes.object.isRequired
};

export default AlertMessage;

