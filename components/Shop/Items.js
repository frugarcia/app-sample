import { Card, Label, Icon } from 'semantic-ui-react'

//Components
import Item from './Item'

export default (props) => {
  const { items, addToCart } = props;
  return (
    <div style={{padding: "0.1em 0.1em"}}>
      <h2>Lista de la compra</h2>
      <Label style={{marginBottom: "1em", fontSize: "1em"}} color="green">
        <Icon name='circle outline' /> Productos
      </Label>
      <Card.Group stackable>
        {items && items.map(item => <Item key={item.id} item={item} addToCart={() => addToCart(item.id)}/>)}
      </Card.Group>
    </div>
  )
}
