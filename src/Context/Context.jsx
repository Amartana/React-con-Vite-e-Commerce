import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const ShoppingCardContext = createContext()

export function ShoppingProvider({children}){
  //Shopping Cart - Quantity
    const [contadorCarrito, setContadorCarrito] = useState(0)

  //Product detail - Open/Close
    const [isPoroductDetailOpen, setIsPoroductDetailOpen] = useState(false)
  //Product Detail - Show Product
    const [productToShow, setProductToShow] = useState({})
  
  //Abrir y cerrar ventana de detalles
    function openCloseDetail(){
      setIsPoroductDetailOpen(!isPoroductDetailOpen)
    }

    function showProducts(item) {
      openCloseDetail()
      setProductToShow(item)
  }
 
  //Shoping cart - Open/Close
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)

  function shoppingCartOpenClose(){
    setIsShoppingCartOpen(!isShoppingCartOpen)
  }

  //Productos en carrito
  const [productsInCart, setProductsInCart] = useState([])

  //agregar productos al carrito
  function agregarProductosAlCart(event, productData){
    event.stopPropagation()
    isPoroductDetailOpen&&openCloseDetail()
    setIsShoppingCartOpen(true)
    setContadorCarrito(contadorCarrito + 1)
    setProductsInCart([... productsInCart, productData])
    sumarAlTotal(productData.price)
  }

  //eliminar productos de carrito ------------------------------------------------------------------------
 function eliminarProductoCarrito(id,price){
    const nuevoArray = productsInCart.filter(product => product.id !== id)
    setProductsInCart(nuevoArray)
    setContadorCarrito(contadorCarrito-1)
    sumarAlTotal(-price)

    // let nuevaLista = [...productsInCart]
    // const i = productsInCart.findIndex(product => product.id === id)
    // nuevaLista.splice(i,1)
    // setProductsInCart(nuevaLista)
    // setContadorCarrito(contadorCarrito-1)
//---------------------------------------------------------------------------------------------------
  }

  //estado valor total del carrito
  const [totalCart, setTotalCart] = useState(0)

  //sumar valor de productos:
  function sumarAlTotal(price){
    setTotalCart(totalCart+price)
  }


  //Datos de la API
  const [items, setItems] = useState(null)

  //Pedido de datos a la API
   useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`)
        }
        return response.json()
      })
      .then(info => {
        setItems(info)
      })
   
      .catch(error => {
        alert('Error:', error)
      })
  }, [])

    
    return(
        <ShoppingCardContext.Provider value={{
            contadorCarrito,
            setContadorCarrito,
            openCloseDetail,
            isPoroductDetailOpen,
            productToShow,
            items,
            showProducts,
            shoppingCartOpenClose,
            isShoppingCartOpen,
            agregarProductosAlCart,
            productsInCart,
            setProductsInCart,
            eliminarProductoCarrito,
            totalCart,
            setTotalCart,
            sumarAlTotal
        }}>
          {children}
        </ShoppingCardContext.Provider>
    )
}

ShoppingProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

// ya lo exporte al lado de donde los defini