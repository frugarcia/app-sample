//Dependencies
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { Container, Header, Divider } from 'semantic-ui-react';
import { getNotices } from '../lib/contentful';

//Components
import Layout from '../components/Layout';
import Notice from '../components/Notices/Notice'

const Notices = ({ url, notices }) => {
  return (
    <Layout url={url}>
      <Container text textAlign='center'>
        <Header as='h1' color='red'>EL DIARIO NACIONAL</Header>
        <Divider/>
        { notices && notices.map((notice, i) => <Notice key={i} notice={notice}/> ) }
      </Container>
    </Layout>
  )
};

Notices.getInitialProps = async () => {
  const notices = await getNotices('notices')
  return { notices } || {}
};

Notices.propTyes = {
  url: PropTypes.object.isRequired,
  notices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRedux(initStore)(Notices);
