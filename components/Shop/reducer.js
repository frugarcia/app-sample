import * as types from '../../constants/actionTypes';
import items from '../../constants/items';

import _ from 'lodash';
import { Map, merge, update } from 'immutable';

const initialState = {
  items,
  shopCart: {
    qtyTotal: 0,
    euroTotal: 0,
    items: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return addToCart(state, action.id)
    case types.REMOVE_CART:
      return removeFromCart(state, action.id)
    default: return state
  }
};

const removeFromCart = ({ items, shopCart }, idItem) => {
  const itemToRemove = _.find(shopCart.items, item => item.id === idItem);
  return {
    items: update(items, items.findIndex(i => i.id === idItem), item => update(item, 'stock', v => v + 1)),
    shopCart: merge(shopCart, {
      qtyTotal: shopCart.qtyTotal -1,
      euroTotal: shopCart.euroTotal - itemToRemove.euroPrice,
      items: itemToRemove.qty <= 1 ? shopCart.items.filter(item => item.id !== idItem) :
        update(
          shopCart.items,
          shopCart.items.findIndex(i => i.id === idItem),
          item => Object.assign({}, item, { qty: item.qty - 1, total: item.total - itemToRemove.euroPrice, stock: item.stock + 1 })
        )
    })
  }
};

const addToCart = ({ items, shopCart }, idItem) => {
  const isInCart = shopCart.items.findIndex(i => i.id === idItem) === -1 ? false : true;
  const item = _.find(shopCart.items, item => item.id === idItem) || _.find(items, item => item.id === idItem);
  const itemToAdd = Map(item).deleteAll(['image', 'description']).merge({ qty: 1, total: item.euroPrice, stock: item.stock - 1 }).toJS();
  return {
    items: update(items, items.findIndex(i => i.id === idItem), item => update(item, 'stock', v => v ? v - 1 : v)),
    shopCart: merge(shopCart, {
      qtyTotal: shopCart.qtyTotal + 1,
      euroTotal: shopCart.euroTotal + itemToAdd.euroPrice,
      items: !isInCart ? [...shopCart.items, itemToAdd] :
        update(
          shopCart.items,
          shopCart.items.findIndex(i => i.id === idItem),
          item => Object.assign({}, item, { qty: item.qty + 1, total: item.total + itemToAdd.euroPrice, stock: item.stock - 1 })
        )
    })
  }
};
