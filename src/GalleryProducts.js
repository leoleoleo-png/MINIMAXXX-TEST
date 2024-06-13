import React, { useEffect, useState } from 'react';
import { fetchProducts } from './apiProducts';

const GalleryProducts = ({ phone }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: phone ? '20px' : '80px' }}>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ fontSize: phone ? 'calc(7vh)': 'calc(10vh)' }}>{product.title}</h2>
            <h3 style={{ width: phone ? '80%' : '30%', paddingTop: phone ? '30px': '50px', paddingBottom: '50px' }}>{product.paragraph}</h3>
            {product.images.map(image => (
              <img
                style={{ width: '100%', paddingBottom: '20px' }}
                key={image.url}
                src={image.url}
                alt={product.title}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryProducts;
