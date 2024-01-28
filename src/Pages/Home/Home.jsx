import { useContext } from "react"
import { Layout } from "../../Components/Layout/Layout"
import { Card } from '../../Components/Card/Card'
import { ProductDetail } from "../../Components/ProductDetail/ProductDetail"
import './Home.css'
import { ShoppingCardContext } from "../../Context/Context"

function Home() {
 const context = useContext(ShoppingCardContext)
  return (
    <Layout>
      Home

      <div className="grid gap-4 w-full max-w-screen-lg prueba">
        {
          context.items?.map((item) => {
            return <Card key={item.id} info={item} />
          }
          )
        }
      </div>
      <ProductDetail />
    </ Layout>

  )
}

export default Home