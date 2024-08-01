import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const { state, dispatch } = useContext(CartContext);

    const addToCart = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    };

    return (
        <div>
            <h2>Product List</h2>
            <div className="product-list">
            {state.items.map(item => (
    <div key={item.id} className="product-item">
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p>${item.price.toFixed(2)}</p>
        <button onClick={() => addToCart(item.id)}>Add to Cart</button>
    </div>
))}

            </div>
        </div>
    );
};

export default ProductList;
