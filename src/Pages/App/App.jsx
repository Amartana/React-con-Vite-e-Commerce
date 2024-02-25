import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingProvider } from '../../Context/Context'
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import MyOrder from '../MyOrder/MyOrder'
import MyOrders from '../MyOrders/MyOrders'
import NotFound from '../NotFound/NotFound'
import SignIn from '../SignIn/SignIn'
import { Navbar } from '../../Components/Navbar/NavBar'
import './App.css'


function AppRoutes() {
  let routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/My-account',
      element: <MyAccount />,
    },
    {
      path: '/',
      element: <MyOrder />,
    },
    {
      path: '/My-order',
      element: <MyOrder />,
    },
    {
      path: '/my-orders',
      element: <MyOrders />,
    },
    {
      path: '/My-orders/last',
      element: <MyOrder />,
    },
    {
      path: '/My-orders/:id',
      element: <MyOrder />,
    },
    {
      path: '/Sign-in',
      element: <SignIn />,
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ])

  return routes
}


function App() {
  return (
    <ShoppingProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingProvider>
  )
}

export default App
