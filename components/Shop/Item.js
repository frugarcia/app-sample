import { formatNumber } from 'accounting-js';
import { Grid, Card, Icon, Image, Button, Label } from 'semantic-ui-react'

export default ({item, addToCart}) => (
  <Card key={item.id}>
    <Image style={{background: "#fff", padding: "0.5em"}} src={item.image} />
    <Card.Content>
      <Card.Header>
        {item.name}
      </Card.Header>
      <Card.Description>
        {item.description}
      </Card.Description>
      <Card.Meta>
        <span className='date'>
          {item.stock &&
            <Label size="tiny" color="green">En stock: {item.stock}</Label> || 
            <Label size="tiny" color="red">Artículo no disponible</Label>
          }
        </span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <div style={{fontSize: "1.2em"}}><Icon name='eur' />{ formatNumber(item.euroPrice, { precision: 2, thousand: ".", decimal: "," })} </div>
          </Grid.Column>
          <Grid.Column textAlign="right">
            {item.stock && <Button color="green" compact onClick={() => addToCart(item.id)}><Icon name="plus cart"/>Añadir</Button> ||
              <Button color="blue" compact >Reservalo</Button>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
)
