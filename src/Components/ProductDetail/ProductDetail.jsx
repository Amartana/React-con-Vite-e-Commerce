import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from '../../Context/Context'
import './ProductDetail.css'


export function ProductDetail(){
    const context = useContext(ShoppingCardContext)
        // console.log('PORUDCUT TO SHOW:', context.productToShow)
    return(
        <aside className={`${context.isPoroductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer'
                            onClick={context.openCloseDetail}/>
                </div>
            </div>
            <div className=' flex flex-col overflow-y-auto'>
                <figure className='px-6'>
                    <img 
                    className='w-full h-full rounded-lg ' 
                    src={context.productToShow.images ? context.productToShow.images[1]: ''} alt='dsa'></img>
                </figure>
                <p className='flex flex-col p-6'>
                <span className='font-medium text-2x1 mb-2'>$ {context.productToShow.price}</span>
                <span className='font-medium text-md'> {context.productToShow.title} </span>
                <span className='font-light text-sm'> {context.productToShow.description } </span>
                </p>
            </div>
        </aside>
    )
}


/* -------------------------- error de que no puede acceder a images[0] ------------------------

Sucede porque ni bien carga la pagina no existe todavia esa propiedad. 

Las opciones son:

------> Usar el operador ternario para que solo le asigne una ruta si la propiedad que tiene la ruta ya existe, y sino que le asigne un string vacio. Cuando se abra el productDetail ahi se le van a mandar los parametros a los que tiene que acceder y ahi va a poder asignarle un valor.

------> Definir en el state de los productToShow, no solo que el valor inicial es una objeto, sino tambien cuales son las propiedades de ese objeto y que tipo de dato son:
En context.jsx :
                  const [productToShow, setProductToShow] = useState({
                                                                        id: '';
                                                                        title: '';
                                                                        images: [];
                                                                        category: ''
                                                                    })



------> operador Optional chaining (?.)

?.

Ejemplo de cómo quedaría el código accediendo a la imagen:
<img
	className="w-full h-full rounded-lg"
        src={context.productToShow.images?.[0]}
        alt={context.productToShow.title}
  />

Este operador se utiliza para acceder a propiedades de objetos anidados de forma segura, evitando errores si alguna de las propiedades no está definida o es nula. */