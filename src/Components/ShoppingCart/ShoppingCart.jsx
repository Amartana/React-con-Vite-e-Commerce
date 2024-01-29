import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from '../../Context/Context'
import './ShoppingCart.css'
import { OrderCard } from '../OrderCard/OrderCard'

export function ShoppingCart() {

    const context = useContext(ShoppingCardContext)

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
                        />
                        ))
            }

            </div>


            <div className='h-14 flex justify-between p-8 items-center totalCart'> 
                <p className='text-lg font-semibold '>TOTAL: </p>
                <span className='text-xl font-bold'> ${context.totalCart} </span>
            </div>

        </aside>
    )
}