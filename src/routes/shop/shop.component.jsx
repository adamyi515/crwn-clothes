import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';

// Components
import ProductCard from '../../components/product-card/product-card.component';

const ShopPage = () => {
    const { products } = useContext(ProductContext);

    return (
        <div>
            {products.map(product => <ProductCard key={product.id} product={product}  />)}
        </div>
    )
}

export default ShopPage;