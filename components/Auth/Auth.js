//Dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onChangeStateAuth } from './actions';

import firebase from 'firebase';
import clientCredentials from '../../credentials/client';
import { Menu, Button } from 'semantic-ui-react';

class Auth extends React.Component {

  componentDidMount() {
    if (!firebase.apps.length) firebase.initializeApp(clientCredentials)
    firebase.auth().onAuthStateChanged(user => {
      this.props.onChangeStateAuth(user)
    })
  }

  handleLogin () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  render(){
    const { auth } = this.props;
    return (
      <Menu.Item position="right">
        {
          ! auth ?
          <Button color="blue" onClick={this.handleLogin}>Google Login</Button> :
          <div>
            <span style={{ display: "block", fontSize: "0.9em", paddingBottom: ".5em"}}>{auth.email}</span>
            <Button color="youtube" fluid compact size="tiny" style={{ display: "block" }} onClick={this.handleLogout} >Logout</Button>
          </div>
        }
      </Menu.Item>
    )
  }
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    onChangeStateAuth: bindActionCreators(onChangeStateAuth, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
