import { formatNumber } from 'accounting-js';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';

export default ({ countries }) => {
  return (
    <Grid columns={4}>
      { countries && countries.map((item, i)=>(
        <Grid.Column textAlign="center" key={i}>
          <Card style={{ height: "100%" }}>
            <Image style={{ margin: ".3em" }} src={item.flag} />
            <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Meta>{item.capital}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {formatNumber(item.population, { precision: 0, thousand: "." })}
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
      )) }
    </Grid>
  )
}
