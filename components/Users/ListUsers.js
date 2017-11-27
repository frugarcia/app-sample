//Dependencies
import PropTypes from 'prop-types'
import { Transition, List, Image, Button } from 'semantic-ui-react'

const ListUsers = ({ users, removeUser }) => {
  return (
    <Transition.Group
      as={List}
      duration={200}
      divided
      size='huge'
      verticalAlign='middle'
    >
      {users && users.map((item, i) => (
        <List.Item key={i} style={{display: "block"}}>
          <List.Content floated="right">
            <Button compact onClick={()=> removeUser(i)} size="mini" color="youtube">Eliminar</Button>
          </List.Content>
          <List.Icon color={item.gender === 'male' ? 'blue' : 'pink'} name={item.gender} size="large"/>
          <List.Content>
            <List.Header as="h4">{item.completeName}</List.Header>
            <List.Description style={{fontSize: ".6em"}}>{item.email}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </Transition.Group>
  )
};

ListUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUser: PropTypes.func.isRequired
};

export default ListUsers;
