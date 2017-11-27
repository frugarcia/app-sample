//Dependencies
import { formatNumber } from 'accounting-js';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';

export default ({ countries, url }) => {
  return (
    <Grid columns={4}>
      { countries && countries.map((item, i)=>(
        <Grid.Column textAlign="center" key={i}>
          <Link
            as={`/countries/${item.alpha3Code.toLowerCase()}`}
            href={`/country/?alphaCode=${item.alpha3Code.toLowerCase()}`
          }>
            <Card style={{ height: "100%" }}>
              <Image style={{ margin: ".3em" }} src={item.flag} />
              <Card.Content>
                <Card.Header>{item.translations.es || item.name}</Card.Header>
                <Card.Meta>{item.capital}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                  <Icon name='user' />
                  {formatNumber(item.population, { precision: 0, thousand: "." })}
              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
      )) }
    </Grid>
  )
};
