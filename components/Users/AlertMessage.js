import { Message, Transition } from 'semantic-ui-react'

export default ({ dataMessage }) => {
  return (
    <Transition.Group animation="fade up" duration={500}>
      {dataMessage ?
          <Message positive={dataMessage.action === "positive"} negative={dataMessage.action === "negative"} size="small" content={dataMessage.message}/>
      : null }
    </Transition.Group>
  )
}
