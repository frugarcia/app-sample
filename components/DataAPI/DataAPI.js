
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getDataAPI, resetDataAPI, handleUrlAPI } from './actions'
import { Message, Input, Button, Divider, Icon } from 'semantic-ui-react'

const renderResult = APIresponse => {
  if (APIresponse && APIresponse.isError)
  return <Message negative>
    <Message.Header>Error al obtener los datos</Message.Header>
    <p>Se ha producido un error al obtener los datos, asegúrate que que la dirección introducida es correcta.</p>
  </Message>
  else if (APIresponse && APIresponse.data )return <pre>{JSON.stringify(APIresponse.data, null, 2)}</pre>
  else return null;
}

//

const DataAPI  = ({ mainStyles, getDataAPI, resetDataAPI, handleUrlAPI, dataAPI }) => {
  return (
    <div style={mainStyles}>
      <h2>Data API</h2>
      <Input
        loading={dataAPI.response && dataAPI.response.isLoading}
        style={{ marginBottom: "1em" }}
        fluid
        placeholder='Introduzca la dirección de la API'
        onChange={ e => handleUrlAPI(e.target.value) }
        size="medium"
        value={dataAPI.url}
      />
      <Button size='small' color="green" onClick={getDataAPI}>Obtener datos de la API</Button>
      <Button size='small' color="red" onClick={resetDataAPI}>Borrar datos de la API</Button>
      {renderResult(dataAPI.response)}
      <Divider horizontal>Consumir una API</Divider>
    </div>
  )
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    resetDataAPI: bindActionCreators(resetDataAPI, dispatch),
    getDataAPI: bindActionCreators(getDataAPI, dispatch),
    handleUrlAPI: bindActionCreators(handleUrlAPI, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataAPI)
