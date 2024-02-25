
import { useContext } from "react"
import { Layout } from "../../Components/Layout/Layout"
import { OrdersCard } from "../../Components/OrdersCard/OrdersCard"
import { ShoppingCardContext } from "../../Context/Context"
import { Link } from "react-router-dom"



function MyOrders() {

const context = useContext(ShoppingCardContext)

  return (
    <Layout>
     <h1 className="font-medium text-xl mb-4">Mis compras</h1>

     {
      context.order.map((order,index) =>
      <Link key={index} to={`/my-orders/${index}`}>
        <OrdersCard 
          totalPrice={order.totalPrice}
          totalProducts={order.totalProducts}
        />
      </Link>
      )

     }

  
     

    </Layout>

  )
}

export default MyOrders