import { Popup, Button, Image } from 'semantic-ui-react';


export default ({ user, logout }) => {
  return(
    <Popup
      trigger={<Button content="Cuenta" color="green" />}
      on="click"
    >
      <div style={{textAlign: "center"}}>
        <Image style={{border: "3px solid #ccc", borderRadius: "50%"}} className="image" src={user && user.photoURL} size="tiny" centered/>
        <p style={{margin: "0.3em 0", color: "#333"}}><b>{user.displayName}</b></p>
        <p style={{fontSize: "0.8em", color: "#333"}}>{user.email}</p>
        <Button className="button" color="red" onClick={logout} size="mini">Cerrar Sesión</Button>
      </div>
    </Popup>
  )
}
