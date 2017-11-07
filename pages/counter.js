
//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';

//Components
import Header from '../components/Header';
import Counter from '../components/Counter';

const styles={
  padding: "1em"
}

export default withRedux(initStore)(({ url }) => (
  <div>
    <Header url={url.pathname}/>
    <Counter mainStyles={styles} />
  </div>
));
