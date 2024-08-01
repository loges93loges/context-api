
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);

    const increaseQuantity = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    };

    const decreaseQuantity = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    };

    return (
        <div>
            <br/>
            <h2>Shopping Cart</h2>
            <br/>
            <table className='move'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                                <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 0}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <br/>
                <h3>Total Quantity: {state.totalQuantity}</h3>
                <br/>
                <h3>Total Amount: ${state.totalAmount.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Cart;