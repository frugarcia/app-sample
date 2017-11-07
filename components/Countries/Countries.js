import 'isomorphic-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider, Button, Input, Dimmer, Loader, Message } from 'semantic-ui-react';
import { countrySearch, resetSearch } from './actions';

import ListCountries from './ListCountries';

class Countries extends React.Component {

  static getInitialProps (initialProps) {
    return { initialProps, hola: 'hola' }
  }

  state = { searchValue: "" }
  componentWillUnmount(){ this.props.resetSearch() }
  handleInput = (e, i) => this.setState({ searchValue: i.value })
  onSearch = () => {
    this.props.countrySearch(this.state.searchValue)
    this.setState({ searchValue: "" })
  }

  render(){
    const { countrySearch, mainStyles, countries } = this.props;
    return (
      <div style={this.props.mainStyles}>
        <h2>Paises del mundo</h2>
        <Input
            type="text"
            placeholder="Introduzca el nombre de un país ..."
            fluid
            action
            onChange={this.handleInput.bind(this)}
            value={this.state.searchValue}
          >
            <input/>
            <Button onClick={this.onSearch.bind(this)} type='submit'>Buscar</Button>
          </Input>
          {
            countries.isLoading ?
            <Dimmer active inverted>
              <Loader size='large'>Cargando datos...</Loader>
            </Dimmer> :
            countries.statusResponse ?
            <Message
              positive={ countries.statusResponse === "OK" }
              negative={ countries.statusResponse === "EMPTY" || countries.statusResponse === "ERROR" }
              size="small"
              content={
                countries.statusResponse === "OK" ? `Se han encontrado ${countries.response.length} resultados de su búsqueda.` :
                countries.statusResponse === "EMPTY" ? `Su búsqueda no ha encontrado ningún resultado` :
                'Se produjo un error al realizar la búsqueda, inténtelo de nuevo'
              }
            /> : null
          }
        <Divider horizontal>Lista de paises</Divider>
        <ListCountries countries={countries.response}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  countrySearch: bindActionCreators(countrySearch, dispatch),
  resetSearch: bindActionCreators(resetSearch, dispatch)
});

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Countries)
