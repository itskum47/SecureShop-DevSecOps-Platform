import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {/* Intentionally vulnerable to XSS for DAST scanning */}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
