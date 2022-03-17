import React, { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

const initialState = {
    products: []
}
export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {
        products
    }

    return(
        <ProductContext.Provider value={value}>
            { children }
        </ProductContext.Provider>
    )
}