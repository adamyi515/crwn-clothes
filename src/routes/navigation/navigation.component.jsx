import React, { useContext } from 'react'
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

// Firebase Utils
import { signOutUser } from '../../utils/firebase/firebase.utils';

// Context
import { UserContext } from '../../contexts/user.context';

// react-router-dom
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  // Methods ////////////////////////////////////////////
  const signOutHandler = async () => {
    const response = await signOutUser();
  }


  return (
    <>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo />
            </Link>
            <div className='nav-links-container'>
                <Link to='/shop' className='nav-link'>SHOP</Link>
                {currentUser ? (
                  <span className='nav-link' onClick={signOutHandler} >SIGN OUT</span>
                ) : <Link to='/auth' className='nav-link'>SIGN IN</Link>}
            </div>
          
        </div>
        <Outlet />
    </>
  )
}

export default Navigation;