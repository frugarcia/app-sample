//Dependencies
import PropTypes from 'prop-types';
import marked from 'marked';
import { Header, Divider } from 'semantic-ui-react';


const Notice = ({ notice }) => {
  return (
    <div>
      <Header textAlign='left' as='h1'> {notice.title} </Header>
      <Header textAlign='left' as='h4'> {notice.titleSub} </Header>
      <img style={{ maxWidth: '100%', marginBottom: '2em' }} src={notice.image.file.url} alt={notice.title}/>
      <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{__html: marked(notice.notice)}} />
      <Divider style={{ paddingBottom: '3em' }}/>
    </div>
  )
};

Notice.propTypes = {
  notice: PropTypes.object.isRequired
};

export default Notice;
