import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser, removeUser, addFakeUser, validateNewUser } from './actions';
import { Divider, Button, Input, Select } from 'semantic-ui-react';

//Components
import ListUsers from './ListUsers'
import AlertMessage from './AlertMessage'

const options = [
  { key: 'gender', text: 'Género', value: 'gender' },
  { key: 'male', text: 'Masculino', value: 'male' },
  { key: 'female', text: 'Femenino', value: 'female' },
]

class Users extends React.Component {
  state = { userName: "", gender: 'gender' }

  handleInput(e, i){ this.setState({ userName: i.value }) }
  handleGender(e, i){ this.setState({ gender: i.value }) }

  onAdd(){
    const newUser = { user: this.state.userName, gender: this.state.gender }
    this.props.addUser(newUser)
    validateNewUser(newUser) ? this.setState({ userName: "", gender: 'gender' }) : null
  }

  render(){
    const { removeUser, addFakeUser, mainStyles, users } = this.props;
    return(
      <div style={mainStyles}>
        <h2>Gestión de usuarios</h2>
        <AlertMessage dataMessage={users.message} />
        <Button color="blue" compact style={{margin: "1em 0"}} onClick={addFakeUser}>Crear Usuario Aleatorio</Button>
        <Input
          type="text"
          placeholder="Introduzca su nombre y sus apellidos..."
          fluid
          action
          onChange={this.handleInput.bind(this)}
          value={this.state.userName}
        >
          <input/>
          <Select compact options={options} onChange={this.handleGender.bind(this)} value={this.state.gender} />
          <Button onClick={this.onAdd.bind(this)} type='submit'>Añadir</Button>
        </Input>
        <Divider horizontal>Lista de usuarios</Divider>
        <ListUsers users={users.data} removeUser={removeUser} />

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: bindActionCreators(addUser, dispatch),
  addFakeUser: bindActionCreators(addFakeUser, dispatch),
  removeUser: bindActionCreators(removeUser, dispatch)
})

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Users);
