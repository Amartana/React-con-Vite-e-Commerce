import { useContext } from "react"
import PropTypes from 'prop-types';
import { PlusIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from "../../Context/Context"

function Card(props) {
    const context = useContext(ShoppingCardContext)

 //la funcion de onClick esta en el contexto, la profe la tiene aca

    return (

        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg mx-auto"
            onClick={()=>context.showProducts(props.info)}
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5"> {props.info.category.name} </span>
                <img className="w-full h-full object-cover rounded-lg" src={props.info.images[0]} alt={props.info.title} />
                <div className="absolute top-0 right-0 flex justify-center datas-center bg-white w-6 h-6 rounded-full m-2 p-1"
                    onClick={() => context.setContadorCarrito(context.contadorCarrito + 1)}
                >
                    <PlusIcon className='h-6 w-6 text-black' />
                </div>
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{props.info.title}</span>
                <span className="text-lg font-medium">$ {props.info.price} </span>
            </p>
        </div>

    )
}
Card.propTypes = {
    info: PropTypes.object.isRequired
  }

export { Card }