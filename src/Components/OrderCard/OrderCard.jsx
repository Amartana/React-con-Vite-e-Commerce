
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useContext, useState } from 'react'
import { ShoppingCardContext } from '../../Context/Context'
import './OrderCard.css'
import PropTypes from 'prop-types';


function OrderCard({ id, title, images, price }) {

    const context = useContext(ShoppingCardContext)
    //Contador de producto
    const [cantidadProducto, setCantidadProducto] = useState(1)
    const [priceProducto, setPriceProducto] = useState(price)

//-------- Pasar por parametros si price es +/- y si 1 es +/- y unir las funciones de sumar y restar en una sola
    //Restar productos 
    const restarProducto = () => { 
        if(cantidadProducto > 1){
            setCantidadProducto(cantidadProducto - 1)
            context.setContadorCarrito(context.contadorCarrito-1)
            setPriceProducto(priceProducto-price)
            context.sumarAlTotal(-price)
        } else {
            context.eliminarProductoCarrito(id, price)
        }
      
    }
    //Sumar productos
    const sumarProducto = () => {
         setCantidadProducto(cantidadProducto + 1)
         context.setContadorCarrito(context.contadorCarrito+1)
         setPriceProducto(priceProducto+price)
         context.sumarAlTotal(price)
        }
// ---------------------------------------------------------------------------------------------------

    //sumar al total del carrito

    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex item-center gap-2 ">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={images} alt={title} />
                </figure>
                <div className="w-40 flex flex-col justify-around">
                    <p className='text-sm font-light flex h-10 items-center'> {title} </p>
                    <div className='flex items-center justify-center gap-1 contador'>
                        <MinusIcon 
                            className='restarProducto h-5 w-5 text-black cursor-pointer'
                            onClick={restarProducto}
                        />

                        <div  className='h-6 w-6 flex justify-center font-medium' > 
                            <span> {cantidadProducto} </span>
                        </div>

                        <PlusIcon 
                            className='sumarProducto h-5 w-5 text-black cursor-pointer'
                            onClick={sumarProducto}
                        />
                        {/* Agregar contador para sumar o restar items del mismo producto */}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">${priceProducto}</p>
                <TrashIcon className='elimarProducto h-6 w-6 text-black cursor-pointer'
                    onClick={() => context.eliminarProductoCarrito(id, price)}
                />
            </div>
        </div>
        
    )
}

OrderCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired
}

export { OrderCard }

// border-solid border-2 border-indigo-500/50 rounded-lg'