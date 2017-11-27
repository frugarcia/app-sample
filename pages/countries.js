//Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store.js';
import { bindActionCreators } from 'redux';
import { loadAllCountries, resetSearch, filterCountries } from '../components/Countries/actions';
import { Search, Divider, Button, Input, Dimmer, Loader, Message } from 'semantic-ui-react';

//Components
import Layout from '../components/Layout';
import ListCountries from '../components/Countries/ListCountries';

class Countries extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue: '',
      isLoading: false
    }
    this.onReset = this.onReset.bind(this)
    this.handleInput = this.handleInput.bind(this)
  };

  componentDidMount() { this.props.loadAllCountries() };

  handleInput(e, i) {
    this.setState({ searchValue: i.value, isLoading: true })
    setTimeout(() => {
      if (this.state.searchValue.length < 1) this.onReset()
      this.props.filterCountries(i.value)
      this.setState({ isLoading: false })
    }, 500)
  };

  onReset(){
    this.setState({ searchValue: '' })
    this.props.resetSearch();
  };

  render () {
    const { countries, url } = this.props;
    return (
      <Layout url={url}>
        <h2>Paises del mundo</h2>
        <Search
          placeholder='Introduzca el nombre de un país en cualquier idioma'
          input={{ fluid: true }}
          style={{ width: '100%' }}
          loading={this.state.isLoading}
          onSearchChange={this.handleInput}
          value={this.state.searchValue}
          showNoResults={false}
        />
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
                countries.statusResponse === "OK" ? `Se han encontrado ${countries.filterData.length} resultados de su búsqueda.` :
                countries.statusResponse === "EMPTY" ? `Su búsqueda no ha encontrado ningún resultado` :
                'Se produjo un error al realizar la búsqueda, inténtelo de nuevo'
              }
            /> : null
          }
        <Divider horizontal>Resultados</Divider>
        <ListCountries url={url} countries={countries.filterData}/>
      </Layout>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  loadAllCountries: bindActionCreators(loadAllCountries, dispatch),
  resetSearch: bindActionCreators(resetSearch, dispatch),
  filterCountries: bindActionCreators(filterCountries, dispatch)
});

const mapStateToProps = state => state;

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Countries);
