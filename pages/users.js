
//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';

//Components
import Header from '../components/Header';
import Users from '../components/Users';

const styles={
  padding: "1em"
}

export default withRedux(initStore)(({ url }) => (
  <div>
    <Header url={url.pathname}/>
    <Users mainStyles={styles} />
  </div>
));
