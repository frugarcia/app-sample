import { Transition, List, Image, Button } from 'semantic-ui-react'

export default ({ users, removeUser }) => {
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
            <List.Header as="h4">{item.user}</List.Header>
            <List.Description style={{fontSize: ".6em"}}><b>{item.gender === "female" ? "Femenino" : "Masculino"}</b></List.Description>
          </List.Content>
        </List.Item>
      ))}
    </Transition.Group>
  )
}
