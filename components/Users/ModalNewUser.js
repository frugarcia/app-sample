//Dependencies
import PropTypes from 'prop-types';
import { isEmail } from 'validator';
import { Button, Input, Header, Icon, Modal, Form, Label } from 'semantic-ui-react';

const isValidCompleteName = string => string.trim().length > 10;

class ModalNewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: { isValid: false, value: 'none' },
      email: { isValid: false, value: ''},
      completeName: { isValid: false, value: ''}
    };

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.addUser = this.addUser.bind(this)
  };

  resetForm() {
    this.setState({
      gender: { isValid: false, value: 'none' },
      email: { isValid: isEmail(this.props.defaultEmail), value: this.props.defaultEmail},
      completeName: { isValid: isValidCompleteName(this.props.defaultName), value: this.props.defaultName }
    })
  };

  componentWillReceiveProps(nextProps) {
    this.resetForm()
    this.setState({
      email: { isValid: isEmail(nextProps.defaultEmail), value: nextProps.defaultEmail},
      completeName: { isValid: isValidCompleteName(nextProps.defaultName), value: nextProps.defaultName}
    })
  };

  handleChangeEmail(e) {
    const value = e.target.value;
    this.setState({ email: { isValid: isEmail(value), value } })
  };

  handleChangeName(e) {
    const value = e.target.value;
    this.setState({ completeName: { isValid: isValidCompleteName(value), value } })
  };

  handleGender(gender) {
    this.setState({gender: { isValid: gender !== 'none', value: gender }})
  };

  get isValidForm() {
    return this.state.gender.isValid && this.state.email.isValid && this.state.completeName.isValid
  };

  addUser() {
    if (this.isValidForm) {
      this.props.addUser({
        gender: this.state.gender.value,
        completeName: this.state.completeName.value,
        email: this.state.email.value
      })
      this.props.handleClose()
    }
  };

  render(){
    const { handleOpen, handleClose, modalOpen } = this.props;
    return (
      <Modal
        open={modalOpen}
        onClose={handleClose}
        basic
        size='small'
        closeOnDimmerClick={false}
      >
        <Header icon='user' as='h1' content='Crear nuevo usuario' />
        <Modal.Content>
          <Form inverted>
            <Form.Field>
              <label>Nombre Completo</label>
              <input placeholder='Nombre completo' onChange={this.handleChangeName} defaultValue={this.state.completeName.value} />
              {!this.state.completeName.isValid ? <span style={{ color: '#ff5144', fontSize: '0.8em'}}>El nombre debe contener más de 10 caracteres</span> : null }
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input placeholder='E-mail' onChange={this.handleChangeEmail} defaultValue={this.state.email.value} />
              {!this.state.email.isValid ? <span style={{ color: '#ff5144', fontSize: '0.8em'}}>Debe introducir un email correcto</span> : null }
            </Form.Field>
            <Form.Field>
              <label style={{marginBottom: '.5em'}}>Género</label>
              <Button size="big" onClick={ () => this.handleGender('female') } circular inverted positive={ this.state.gender.value === 'female'}>
                <Icon name='female' /> Femenino
              </Button>
              <Button size="big" onClick={ () => this.handleGender('male') } circular inverted positive={ this.state.gender.value === 'male'}>
                <Icon name='male'/> Masculino
              </Button>
              {!this.state.gender.isValid ? <span style={{ color: '#ff5144', display: 'block', fontSize: '0.8em', marginTop: '0.5em'}}>Debe seleccionar un género</span> : null }
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={handleClose} inverted>
            <Icon name='remove' /> Cancelar
          </Button>
          <Button color='green' inverted disabled={!this.isValidForm} onClick={this.addUser}>
            <Icon name='checkmark' /> Añadir
          </Button>
        </Modal.Actions>
      </Modal>
    )
  };
};

ModalNewUser.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
  defaultEmail: PropTypes.string.isRequired,
  defaultName: PropTypes.string.isRequired,
};

export default ModalNewUser;
