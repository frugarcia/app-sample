//Dependencies
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { authUpdate } from './actions';
import { Menu, Button } from 'semantic-ui-react';
import { config } from '../../lib/googleAuth'

//Components
import AuthDetail from './AuthDetail'

class Auth extends React.Component {

  componentDidMount() {
    !firebase.apps.length ? firebase.initializeApp(config) : null
    firebase.auth().onAuthStateChanged(user => {
      this.props.authUpdate(user)
    });
  };

  handleLogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()))
  };

  handleLogout(){
    firebase.auth().signOut();
  };

  render(){
    const { auth } = this.props;
    return (
      <Menu.Item position="right">
        {
          ! auth.isAuth ?
          <Button color="blue" onClick={this.handleLogin}>Google Login</Button> :
          <AuthDetail user={auth.userData} logout={this.handleLogout}/>
        }
      </Menu.Item>
    )
  }
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    authUpdate: bindActionCreators(authUpdate, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
