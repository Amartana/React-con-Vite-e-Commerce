import { useContext } from "react"
import { Layout } from "../../Components/Layout/Layout"
import { ShoppingCardContext } from "../../Context/Context"
import { OrderCard } from "../../Components/OrderCard/OrderCard"
import { useParams } from "react-router-dom"

function MyOrder() {

  const context = useContext(ShoppingCardContext)
  const params = useParams();
  const indexOrderPath = Number(params.id);
  
  console.log('1 CONSOLE:', context.productsInCart)
  console.log('2 CONSOLE:', context.order?.slice(-1)[0].products)

  return (
    <> <Layout>
     MyOrder
     <div className='px-3 overflow-y-scroll flex-1'>
            {
              (isNaN(indexOrderPath)) ?
                context.order?.slice(-1)[0].products.map(product=>
                        <OrderCard
                         key={product.id}
                         title={product.title}
                         images={product.images}
                         price={product.price}
                         id={product.id}
                        />
                        )
              :
              context.order?.[indexOrderPath].products.map(product=>
                        <OrderCard
                         key={product.id}
                         title={product.title}
                         images={product.images}
                         price={product.price}
                         id={product.id}
                        />
                        )
            }

            </div>
    </Layout>

    </>
  )
}

export default MyOrder