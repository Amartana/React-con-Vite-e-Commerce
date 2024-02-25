
import './OrdersCard.css'
import PropTypes from 'prop-types';
import { ChevronRightIcon, CalendarDaysIcon, CurrencyDollarIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";


function OrdersCard({ totalPrice, totalProducts }) {

    return (
        
             <div className="flex justify-between items-center mb-3 border rounded-lg p-3">
                <div className="flex items-center justify-between grow gap-2 px-4">
                    <div className="flex gap-1 items-center justify-center">
                        <ShoppingCartIcon className="h-6 w-6 text-black" />
                        <p className="font-light text-sm mr-3">{`${totalProducts} ${totalProducts === 1 ? "producto" : "productos"}`}</p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        <CurrencyDollarIcon className="h-6 w-6 text-black" />
                        <p className="font-light text-sm mr-3">${totalPrice}</p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        <CalendarDaysIcon className="h-6 w-6 text-black" />
                        <p className="font-light text-sm"> 01.02.2024 </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ChevronRightIcon className="h-6 w-6 text-black" />
                </div>        
                
            </div>
        
    )
}

OrdersCard.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    totalProducts: PropTypes.number.isRequired,

}

export { OrdersCard }

// border-solid border-2 border-indigo-500/50 rounded-lg'