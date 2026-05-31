import { useState } from 'react'
import Login from './components/Login'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (index) => {
    const newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems(newCart)
  }

  const checkout = () => {
    alert('Checkout successful!')
    setCartItems([])
  }

  const logout = () => {
    setToken(null)
    setCartItems([])
  }

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <h1>SecureShop DevSecOps Platform</h1>
      
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <button onClick={logout} style={{ marginBottom: '20px' }}>Logout</button>
          
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ flex: 2 }}>
              <ProductList addToCart={addToCart} />
            </div>
            
            <div style={{ flex: 1 }}>
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                checkout={checkout} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
