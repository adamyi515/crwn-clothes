import React, { useContext } from 'react';
import './checkout-item.styles.scss';
// Context
import { CartContext } from '../../contexts/cart.context';


const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);


    // Methods
    const handleClearCartItem = () => {
        clearItemFromCart(cartItem);
    }

    const handleAddCartitem = () => {
        addItemToCart(cartItem);
    }

    const handleRemoveCartItem = () => {
        removeItemFromCart(cartItem);
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} className='' />
            </div>
            <span className='name'>{ name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={handleRemoveCartItem}>
                    &#10094;
                </div>
                <span className='value'>{ quantity }</span>
                <div className='arrow' onClick={handleAddCartitem}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{ price }</span>
            <div className='remove-button' onClick={handleClearCartItem}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;