import React, { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data';

// Firebase Utils
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';


const initialState = {
    products: []
}
export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const value = {
        products
    }

    return(
        <ProductContext.Provider value={value}>
            { children }
        </ProductContext.Provider>
    )
}