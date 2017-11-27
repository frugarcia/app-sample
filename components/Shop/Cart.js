//Dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeFromCart, addToCart } from './actions';
import { Button, Header, Icon, Divider } from 'semantic-ui-react';
import { formatNumber } from 'accounting-js';
import { get } from 'immutable';

const CartItem = ({ item, remove, add}) => {
  const style = {
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    padding: '0.6em 0'
  }
  return (
    <li style={style}>
      <span><b>{`${item.qty}x ${item.name}`}</b></span>
      <p style={{color: '#888', fontSize: '0.8em'}}>Precio unitario: {formatNumber(item.euroPrice, { precision: 2, thousand: ".", decimal: "," })} €</p>
      <p>
        <Button color='green' disabled={!item.stock} compact onClick={() => add(item.id)}>+</Button>
        <Button color='youtube' compact onClick={() => remove(item.id)}>-</Button>
        <span style={{float: 'right', paddingRight: '1em'}}><b>{formatNumber(item.total, { precision: 2, thousand: ".", decimal: "," })} €</b></span>
      </p>
    </li>
  )
};

const FooterCart = ({shopCart, isUser}) => {
  const discount = isUser ? shopCart.euroTotal*0.15 : 0 ;
  const totalShop = shopCart.euroTotal - discount
  const style = {
    p: {
      textAlign: 'left',
      margin: '0'
    },
    Divider: {
      margin: '0.4em 0'
    }
  }
  return (
    <div style={{marginTop: '2em'}}>
      <p style={style.p}>Total productos: <b style={{float: 'right'}}>{shopCart.items.length}</b></p>
      <Divider style={style.Divider}/>
      <p style={style.p}>Total unidades: <b style={{float: 'right'}}>{shopCart.qtyTotal}</b></p>
      <Divider style={style.Divider}/>
      <p style={style.p}>Importe de la compra: <b style={{float: 'right'}}>{formatNumber(shopCart.euroTotal, { precision: 2, thousand: ".", decimal: "," })} €</b></p>
      <Divider style={style.Divider}/>
      <p style={style.p}>Descuentos: <b style={{float: 'right'}}>{formatNumber(discount, { precision: 2, thousand: ".", decimal: "," })} €</b></p>
      <p style={{textAlign: 'left', color: 'red', margin: '0', fontSize: '0.8em'}}>{ isUser ? 'Se le está aplicando un 15% de descuentos.': 'Si accede mediante su cuenta de Google, le haremos un 15% de descuento.' }</p>
      <Divider style={style.Divider}/>
      <p style={style.p}><b style={{ fontSize: '1.3em' }}>Importe a pagar: </b><b style={{float: 'right', fontSize: '1.3em'}}>{formatNumber(totalShop, { precision: 2, thousand: ".", decimal: "," })} €</b></p>
    </div>
  )
}

const Cart = ({shopCart, user, removeFromCart, addToCart }) => {
  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };
  return (
    <div style={{padding: "1em"}}>
      <Header as='h2'>
        <Icon name='shop' />
        <Header.Content>
          Carrito
        </Header.Content>
      </Header>
      <Divider/>
      <ul style={listStyle}>
        { shopCart.items.map(item => <CartItem key={ item.id } item={ item } remove={ removeFromCart } add={ addToCart }/>) }
      </ul>
      <FooterCart shopCart={shopCart} isUser={user.isAuth}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    shopCart: get(state.shop, 'shopCart'),
    user: get(state, 'auth')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: bindActionCreators(removeFromCart, dispatch),
    addToCart: bindActionCreators(addToCart, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
