
//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';

//Components
import Header from '../components/Header';
import Countries from '../components/Countries';

const styles={
  padding: "1em"
}

export default withRedux(initStore)(({ url }) => (
  <div>
    <Header url={url.pathname}/>
    <Countries mainStyles={styles} />
  </div>
));
