
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

// Components
import Auth from '../Auth';

const navigateList = [
  {path: "/users", label: "Usuarios"},
  {path: "/counter", label: "Contador"},
  {path: "/countries", label: "Países"},
  {path: "/shop", label: "Tienda Online"},
  {path: "/notices", label: "Noticias"}
];

export default ({ url }) => {
  return (
    <Menu>
      <Link href="/"><Menu.Item header>appSample</Menu.Item></Link>
      {navigateList.map(link => <Link key={link.path} href={link.path}><Menu.Item active={ link.path === url } name={link.label}/></Link>)}
      <Auth/>
    </Menu>
  )
};
