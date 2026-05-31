import React from 'react';

const Cart = ({ cartItems, removeFromCart, checkout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
          <button onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
