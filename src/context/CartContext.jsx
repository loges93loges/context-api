import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
                totalQuantity: action.payload.reduce((sum, item) => sum + item.quantity, 0),
                totalAmount: action.payload.reduce((sum, item) => sum + item.quantity * item.price, 0)
            };
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item),
                totalQuantity: state.totalQuantity + 1,
                totalAmount: state.totalAmount + state.items.find(item => item.id === action.payload).price
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item),
                totalQuantity: state.totalQuantity - 1,
                totalAmount: state.totalAmount - state.items.find(item => item.id === action.payload).price
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/products.json`)

            .then(response => response.json())
            .then(data => {
                const productsWithQuantity = data.products.map(product => ({ ...product, quantity: 0 }));
                dispatch({ type: 'SET_ITEMS', payload: productsWithQuantity });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
