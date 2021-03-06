import React, { useContext } from 'react'
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

// Components
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
// Firebase Utils
import { signOutUser } from '../../utils/firebase/firebase.utils';
// Context
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
// react-router-dom
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo />
            </Link>

            <div className='nav-links-container'>
                <Link to='/shop' className='nav-link'>SHOP</Link>
                {currentUser ? (
                  <span className='nav-link' onClick={signOutUser} >SIGN OUT</span>
                ) : <Link to='/auth' className='nav-link'>SIGN IN</Link>}
                <CartIcon />
            </div>
        </div>
        {isCartOpen && <CartDropdown />}
        <Outlet />
    </>
  )
}

export default Navigation;