import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const App = () => {
    return (
        <CartProvider>
            <div className="app">
                <h1>Vegetable Shopping Cart</h1>
                <ProductList />
                <Cart />
            </div>
        </CartProvider>
    );
};

export default App;

