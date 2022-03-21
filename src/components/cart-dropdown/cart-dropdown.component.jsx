import React, { useContext } from 'react';
import './cart-dropdown.styles.scss';

// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// Context
import { CartContext } from '../../contexts/cart.context';

// Components
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Methods
  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }


  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.map(cartItem => {
              return(
                <CartItem key={cartItem.id} cartItem={cartItem} />
              )
            }) }
            
        </div>
        <Button onClick={goToCheckoutHandler}>
          CHECKOUT
        </Button>
    </div>
  )
}

export default CartDropdown;