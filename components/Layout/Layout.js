
//Components
import Header from '../Header'

const styles={
  padding: "1em"
}

export default (props) => {
  return (
    <div>
      <Header url={props.url.pathname}/>
      <div style={styles}>
        {props.children}
      </div>
    </div>
  )
};
