//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { bindActionCreators } from 'redux';
import { addToCart } from '../components/Shop/actions';
import { Menu, Sidebar } from 'semantic-ui-react'

//Components
import Layout from '../components/Layout';
import Items from '../components/Shop/Items'
import Cart from '../components/Shop/Cart'

const Shop = ({ shop, addToCart, url }) => {
  return (
    <Layout url={url}>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='right'
          visible={Boolean(shop.shopCart.items.length)}
          icon='labeled'
          vertical
          style={{ width: "360px" }}
        >
        <Cart />
        </Sidebar>
        <Sidebar.Pusher>
          <Items items={shop.items} addToCart={addToCart} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Layout>
  )
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Shop);
