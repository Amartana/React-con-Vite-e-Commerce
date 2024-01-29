import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ShoppingCardContext } from "../../Context/Context"
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


function Navbar() {
    const context = useContext(ShoppingCardContext)
    //La variable de activeStyle la defino aca porque estoy usando Tailwind, sino en lugar de una variable, en el operador ternario mando directamente el nombre de la clase a la que le voy a dar estilo en CSS
    const activeStyle = "underline underline-offset-4"

    return (
        <nav className="bg-white flex justify-between items-center fixed z-10 top-0 w-full py-4 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink
                        to='/'
                    >
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/clothes'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/electronics'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/furnitures'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/toys'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/others'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Others
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-3">
                <li className="text-black/60">
                    yiyo@gmail.com
                </li>
                <li>
                    <NavLink
                        to='/my-orders'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/my-account'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        My account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/sign-in'
                        className={({ isActive }) =>
                            isActive ? activeStyle : ""
                        }>
                        Sign In
                    </NavLink>
                </li>
                <li className="flex">
                    <ShoppingBagIcon  
                    className='h-6 w-6 text-black'
                    onClick={context.shoppingCartOpenClose}
                    />
                    <div className="rounded-full bg-slate-100 w-4 h-4 flex items-center justify-center"> {context.contadorCarrito} </div>
                </li>
            </ul>

        </nav>
    )
}

export { Navbar }



/*  ----------------- ALTERNATIVAS PARA ESCRIBIR EL CODIGO ANTERIO --------------------------

-------------------------OPCION 1 ----------------------------------------
// Crear un componente llamado NavItem que acepta las propiedades to, children y activeStyle
function NavItem({ to, children, activeStyle }){
  return (
    // Creamos un componente NavLink que usa el children, to y className
    <NavLink
      to={to}
      className={({isActive }) => (isActive ? activeStyle : undefined)}
    >
      {children}
    </NavLink>
  );
};

// Despues cada item de la lista
    <li>
        <NavItemto="/clothes"activeStyle={activeStyle}>
            Clothes
        </NavItem>
    </li>
    
----------------------------------------------------------------------------


-------------------------OPCION 2 ----------------------------------------
// Hacemos dos arrays con los datos de cada item de cada uno de los menus:
let menu1 = [
    {
        to: '/',
        text: 'Shopi',
        className: 'font-semibold text-lg'
    },
    {
        to: '/',
        text: 'All',
        className: ''
    },
    {
        to: '/clothes',
        text: 'clothes',
        className: ''
    },
    {
        to: '/electronics',
        text: 'electronics',
        className: ''
    },
    {
        to: '/furnitures',
        text: 'furnitures',
        className: ''
    },
    {
        to: '/toys',
        text: 'toys',
        className: ''
    },
    {
        to: '/others',
        text: 'others',
        className: ''
    },
]

let menu2 = [
    {
        to: '/email',
        text: 'juanmer382@gmail.com',
        className: 'text-black/60'
    },
    {
        to: '/myorders',
        text: 'My orders',
        className: ''
    },
    {
        to: '/myoccount',
        text: 'My occount',
        className: ''
    },
    {
        to: '/signin',
        text: 'Sign in',
        className: ''
    },
    {
        to: '/shoppcar',
        text: '🛒',
        className: ''
    },
]

// Creamos el componente Navbar y usamos .map para recorrer los arrays y renderizarlos en un componente NavLink:

const NavBar = () => {
    const textDecoration = 'underline underline-offset-4'

  return (
    <nav className="flex items-center justify-between w-full py-5 px-8 text-sm">
        <ul className='flex gap-3 items-center'>
            {menu1.map(link => (
                <li 
                    key={link.text}
                    className={link.className}
                >
                    <NavLink 
                        to={link.to}
                        className={({isActive})=> isActive ? textDecoration : undefined }
                    >
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </ul>
        <ul className='flex gap-3 items-center'>
            {menu2.map(link => (
                <li 
                    key={link.text}
                    className={link.className}
                >
                    <NavLink 
                        to={link.to}
                        className={({isActive})=> isActive ? textDecoration : undefined }
                    >
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
  )
}






----------------------------------------------------------------------------


*/