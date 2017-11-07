
import {bindActionCreators} from 'redux';
import 

import { Grid, Label, Button, Divider, Segment, Radio } from 'semantic-ui-react'


export default ({ mainStyles }) => (
  <div style={mainStyles}>
    <h2>Lista de la compra</h2>
    <Divider horizontal>Lista de la compra</Divider>
  </div>
)

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  countrySearch: bindActionCreators(countrySearch, dispatch),
  removeToCart: bindActionCreators(removeToCart, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)
