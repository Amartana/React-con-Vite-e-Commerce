import { useContext } from "react"
import { Layout } from "../../Components/Layout/Layout"
import { Card } from '../../Components/Card/Card'
import { ProductDetail } from "../../Components/ProductDetail/ProductDetail"
import './Home.css'
import { ShoppingCardContext } from "../../Context/Context"
import { ShoppingCart } from "../../Components/ShoppingCart/ShoppingCart"


function Home() {
  const context = useContext(ShoppingCardContext)
  
  function renderView() {
    if (context.searchByTitle?.length > 0) {
      console.log('filtered:', context.filteredItems)
      if (context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map((item) => {
            return <Card key={item.id} info={item} />
          }
          )
        )
      } else {
        return (
          <div className="absolute w-full flex flex-col items-center"> 
          <span>Lo siento, no tenemos ese producto! 🔎 </span>
          <img className="w-100 opacity-30" src='https://i.pinimg.com/564x/98/e8/de/98e8de4eb48de7bcd34a4febe3a2bffb.jpg'/>
          
          </div>
        )
      }
    }      
    else {
      return (
        context.items?.map((item) => {
          return <Card key={item.id} info={item} />
        }
        )
      )
    }
    
  }

   return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl"> Todos nuestros productos </h1>
      </div>
      <input 
      type="text" 
      placeholder="Search a product"
      className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
      onChange={(event)=> {context.setSearchByTitle(event.target.value)
      }
      }
       />
      <div className="grid gap-4 w-full max-w-screen-lg prueba">
        
        {
          renderView()
        }
      </div>
      <ProductDetail />
      <ShoppingCart />
    </ Layout>

  )
}

export default Home