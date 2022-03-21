import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    cartCount: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

// Private methods //
const addCartItem = (cartItems, productToAdd) => {
    // Check to see if productToAdd (object) already exist within cartItems
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    // If exist, then increment quantity by 1
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1} : cartItem    
        );
    }
    // If the cartItems is empty, then add the new product
    return [...cartItems, { ...productToAdd, quantity: 1}]; // Its alwasy gonna be 1 because the cart is empty.
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // Find the cartItem to remove.
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
    
    // Check if quantity is equal to 1, remove from the cart.
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // return back cartItems with correct cartItem to reduce by 1.
    return cartItems.map(cartItem => {
        if(cartItem.id === cartItemToRemove.id){
            return { ...cartItem, quantity: cartItem.quantity - 1}
        } else {
            return cartItem;
        }
    })
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);
    

    // Action methods //////////////////
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {
        isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal,
        removeItemFromCart, clearItemFromCart
    }

    return(
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    )
}