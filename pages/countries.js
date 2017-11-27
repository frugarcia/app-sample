//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { bindActionCreators } from 'redux';
import { countrySearch, resetSearch } from '../components/Countries/actions';
import { Divider, Button, Input, Dimmer, Loader, Message } from 'semantic-ui-react';

//Components
import Layout from '../components/Layout';
import ListCountries from '../components/Countries/ListCountries';

class Countries extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue: ''
    }
    this.onSearch = this.onSearch.bind(this)
    this.handleInput = this.handleInput.bind(this)
  };

  handleInput(e, i){ this.setState({ searchValue: i.value }) }

  onSearch(){
    this.props.countrySearch(this.state.searchValue)
    this.setState({ searchValue: "" })
  };

  render () {
    const { countrySearch, countries, url } = this.props;
    return (
      <Layout url={url}>
        <h2>Paises del mundo</h2>
        <Input
            type="text"
            placeholder="Introduzca el nombre de un país ..."
            fluid
            action
            onChange={this.handleInput}
            value={this.state.searchValue}
          >
            <input/>
            <Button onClick={ this.onSearch } type='submit'>Buscar</Button>
          </Input>
          {
            countries.isLoading ?
            <Dimmer active inverted>
              <Loader size='large'>Cargando datos...</Loader>
            </Dimmer> :
            countries.statusResponse ?
            <Message
              negative={ countries.statusResponse === "EMPTY" || countries.statusResponse === "ERROR" }
              size="small"
              content={
                countries.statusResponse === "OK" ? `Se han encontrado ${countries.response.length} resultados de su búsqueda.` :
                countries.statusResponse === "EMPTY" ? `Su búsqueda no ha encontrado ningún resultado` :
                'Se produjo un error al realizar la búsqueda, inténtelo de nuevo'
              }
            /> : null
          }
        <Divider horizontal>Resultados</Divider>
        <ListCountries url={url} countries={countries.response}/>
      </Layout>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  countrySearch: bindActionCreators(countrySearch, dispatch),
  resetSearch: bindActionCreators(resetSearch, dispatch)
});

const mapStateToProps = state => state;

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Countries);
