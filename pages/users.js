//Dependencies
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { bindActionCreators } from 'redux';
import { addUser, removeUser, addFakeUser, alertUserLogin } from '../components/Users/actions';
import { Divider, Button, Dropdown } from 'semantic-ui-react';
import { get } from 'immutable';

//Components
import Layout from '../components/Layout';
import ListUsers from '../components/Users/ListUsers'
import AlertMessage from '../components/Users/AlertMessage'
import ModalNewUser from '../components/Users/ModalNewUser'

class Users extends React.Component {
  state = { modalOpen: false, defaultName:'', defaultEmail:'' }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  onAddGoogleUser = () => {
    if (this.props.auth.isAuth) {
      this.setState({ defaultName: this.props.auth.userData.displayName, defaultEmail: this.props.auth.userData.email });
      this.handleOpen();
    } else {
      this.props.alertUserLogin('negative', 'Debe estar logueado para poder usar esta opción')
    }
  };

  onAddUser = () => {
    this.setState({ defaultName: '', defaultEmail: '' });
    this.handleOpen();
  };

  render(){
    const { removeUser, addFakeUser, addUser, users, auth, url } = this.props;
    return (
      <Layout url={url}>
        <h2>Gestión de usuarios</h2>
        <AlertMessage dataMessage={users.message}/>
        <Button color="blue" onClick={this.onAddUser}>Nuevo usuario</Button>
        <Dropdown style={{margin: '0 0.3em'}} text='Añadir usuario aleatorio' icon='add user' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header content='Seleccione el género' />
            <Dropdown.Item icon="male" text="Masculino" onClick={() => addFakeUser('male')} />
            <Dropdown.Item icon="female" text="Femenino" onClick={() => addFakeUser('female')} />
          </Dropdown.Menu>
        </Dropdown>
        <Button color="blue" onClick={ this.onAddGoogleUser.bind(this) }>Crear mi usuario</Button>
        <Divider horizontal>Lista de usuarios</Divider>
        <ListUsers users={users.data} removeUser={removeUser} />
        <ModalNewUser
          handleOpen={ this.handleOpen.bind(this) }
          handleClose={ this.handleClose.bind(this) }
          modalOpen={ this.state.modalOpen }
          addUser={ addUser }
          defaultEmail={this.state.defaultEmail}
          defaultName={this.state.defaultName}
        />
      </Layout>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addFakeUser: bindActionCreators(addFakeUser, dispatch),
  removeUser: bindActionCreators(removeUser, dispatch),
  addUser: bindActionCreators(addUser, dispatch),
  alertUserLogin: bindActionCreators(alertUserLogin, dispatch),
});

const mapStateToProps = state => {
  return {
    auth: get(state, 'auth'),
    users: get(state, 'users')
  }
};

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  addFakeUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  alertUserLogin: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Users);
