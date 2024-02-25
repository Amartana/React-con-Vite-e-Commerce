import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from '../../Context/Context'
import './ShoppingCart.css'
import { OrderCard } from '../OrderCard/OrderCard'
import { Link } from 'react-router-dom'

export function ShoppingCart() {

    const context = useContext(ShoppingCardContext)

    function handleCheckoout(){
        const orderToAdd = {
            date: '',
            products: context.productsInCart,
            totalProducts: context.productsInCart.reduce((a,b )=>{
                return a + b.cantidad
            },0),
            totalPrice: context.totalCart
        }
        context.setOrder([...context.order, orderToAdd])
        context.setTotalCart(0)
        // context.productsInCart.map(product => product.cantidad = 0)
        context.setProductsInCart([])
        context.setContadorCarrito(0)
           
}

    return (
        <aside className={`${context.isShoppingCartOpen ? 'flex' : 'hidden'} shopping-cart flex-col fixed right-0 border border-black rounded-lg bg-white`}>

            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My order</h2>

                <div>
                    <XMarkIcon 
                        className='h-6 w-6 text-black cursor-pointer'
                        onClick={context.shoppingCartOpenClose}
                    />
                </div>
            </div>

            <div className='px-3 overflow-y-scroll flex-1'>
            {
                context.productsInCart.map( (item) => (
                        <OrderCard
                         key={item.id}
                         title={item.title}
                         images={item.images}
                         price={item.price}
                         id={item.id}
                         mostrarCont={true}
                         mostrarDelte={true}
                        />
                        ))
            }

            </div>


            <div className='h-14 flex justify-between p-8 items-center totalCart'> 
                <p className='text-lg font-semibold '>TOTAL: </p>
                <span className='text-xl font-bold'> ${context.totalCart} </span>
            </div>

            <div className='flex justify-center items-start mb-6'>
                <Link to='/my-orders/last'>
                <button 
                className='w-60 h-10 bg-black text-white rounded-md'
                onClick={()=> handleCheckoout()}
                >
                    Checkout
                </button>
                </Link>
            </div>

        </aside>
    )
}