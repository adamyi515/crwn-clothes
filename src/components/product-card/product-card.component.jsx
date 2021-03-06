import React, { useContext } from 'react';
import './product-card.styles.scss';

// Context
import { CartContext } from '../../contexts/cart.context';

// Components
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
    // Props
    const { id, name, price, imageUrl } = product;

    // Context
    const { addItemToCart } = useContext(CartContext);

    // Methods
    const addProductToCart = () => {
        addItemToCart(product);
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{ name } </span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart} >Add to cart</Button>
        </div>
    )
}

export default ProductCard;