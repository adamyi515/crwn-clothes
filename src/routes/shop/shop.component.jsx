import React, { useContext } from 'react';
import './shop.styles.scss';
import { ProductContext } from '../../contexts/product.context';

// Components
import ProductCard from '../../components/product-card/product-card.component';

const ShopPage = () => {
    const { products } = useContext(ProductContext);

    return (
        <div className='products-container'>
            {products.map(product => <ProductCard key={product.id} product={product}  />)}
        </div>
    )
}

export default ShopPage;