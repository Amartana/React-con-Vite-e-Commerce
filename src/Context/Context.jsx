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
    //hace que el evento de click no se propague al div al que pertenece
    event.stopPropagation()
    //cierra la ventana de detalle del producto ------------------- FALTA HACER QUE NO SE PUEDAN ABRIR DE NUEVO MIENTRAS EL SHOPPING CART ESTE ABIERTO
    isPoroductDetailOpen&&openCloseDetail()
    //Abre el carrito:
    setIsShoppingCartOpen(true)

    setContadorCarrito(contadorCarrito + 1)

    //agrega la propiedad de cantidad para saber cuantos productos se agregaron al carrito------
    productData.cantidad ? productData.cantidad += 1 : productData.cantidad = 1
    setProductsInCart([... productsInCart, productData])
    sumarAlTotal(productData.price)
  }

  //eliminar productos de carrito -------------------------------------
 function eliminarProductoCarrito(id,priceProducto, price){
   
  //reinicia la propiedad cantidad:
   productsInCart[productsInCart.findIndex(product => product.id === id)].cantidad = 0

    //saca al producto del carrito:
    const nuevoArray = productsInCart.filter(product => product.id !== id)
    setProductsInCart(nuevoArray)
    //elimina la cantidad de productos que hay en el carrito:
    setContadorCarrito(contadorCarrito-(priceProducto/price))
    //resta el precio del TOTAL del carrito
    sumarAlTotal(-priceProducto)
  }

  //estado valor total del carrito
  const [totalCart, setTotalCart] = useState(0)

  //sumar valor de productos:
  function sumarAlTotal(price){
    setTotalCart(totalCart+price)
  }

  //Shopping cart Order
  const [order, setOrder] = useState([])


  //Datos de la API---------------------------------------------------------
  const [items, setItems] = useState(null)

  //Productos filtrados
  const [filteredItems, setFilteredItems] = useState(null)

  function filteredItemsByTitle(items, searchByTitle) {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }


  // //filtrar por categoria
  //  function filtrarPorCategorias(categoria){
  //    if(categoria !== undefined){
  //    setItems(items.filter((item)=> item.category.name.toLowerCase() === categoria.toLowerCase()))
  //   }
  // }
  



  //Estado del Buscador por titulo
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Estado de la busqueda por catedoria (este estado se actualiza con el useParams de Home)
  const [searchByCategory, setSearchByCategory] = useState(null)


  


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
        setItems(
          
          info

          )
      })
      .catch(error => {
        alert('Error:', error)
      })
  }, [])


  //Filtros por busqueda y categoria ----------------------------------------------------------

  useEffect(()=> {
    if (searchByTitle) setFilteredItems(filteredItemsByTitle(items, searchByTitle))
  }, [items, searchByTitle])

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  },
 // eslint-disable-next-line react-hooks/exhaustive-deps
 [items, searchByTitle, searchByCategory])


  
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
            sumarAlTotal,
            order,
            setOrder,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
        }}>
          {children}
        </ShoppingCardContext.Provider>
    )
}

ShoppingProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

// ya lo exporte al lado de donde los defini