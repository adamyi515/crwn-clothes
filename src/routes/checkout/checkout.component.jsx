import React, { useContext } from 'react';
import './checkout.styles.scss';

// Components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

// Context
import { CartContext } from '../../contexts/cart.context';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='heaader-block'>
                    <span>Product</span>
                </div>
                <div className='heaader-block'>
                    <span>Description</span>
                </div>
                <div className='heaader-block'>
                    <span>Quantity</span>
                </div>
                <div className='heaader-block'>
                    <span>Price</span>
                </div>
                <div className='heaader-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            }
            <span className='total'>Total: ${ cartTotal }</span>
        </div>
    )
}

export default Checkout;