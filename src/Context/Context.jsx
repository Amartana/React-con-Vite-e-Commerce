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
        console.log('ITEMS:', info)
        setItems(info)
      })
   
      .catch(error => {
        alert('Error:', error.message)
      })
  }, [])

    
    return(
        <ShoppingCardContext.Provider value={{
            contadorCarrito,
            setContadorCarrito,
            openCloseDetail,
            isPoroductDetailOpen,
            productToShow,
            // setProductToShow,
            items,
            showProducts

        }}>
          {children}
        </ShoppingCardContext.Provider>
    )
}

ShoppingProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

// ya lo exporte al lado de donde los defini