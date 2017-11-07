
//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';

//Components
import Header from '../components/Header';
import ShopList from '../components/ShopList';

const styles={
  padding: "1em"
}

export default withRedux(initStore)(({ url }) => (
    <div>
      <Header url={url.pathname}/>
      <ShopList mainStyles={styles} />
    </div>
  )
);
