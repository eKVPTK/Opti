import React, { useEffect, useState } from 'react';
import { fetchBasket, removeFromBasket, updateBasketQuantity } from '../http/basketAPI'; // Импортируем новые функции
import { getUserIdFromToken } from '../utils/auth'; 

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadBasket = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }  

      try {
        const basketData = await fetchBasket(userId);
        setBasketItems(basketData);
        calculateTotalPrice(basketData); 
      } catch (error) {
        setError('Error fetching basket data');
        console.error('Error fetching basket data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.device.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromBasket = async (deviceId) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      await removeFromBasket(userId, deviceId);
      const updatedItems = basketItems.filter(item => item.device.id !== deviceId);
      setBasketItems(updatedItems);
      calculateTotalPrice(updatedItems); 
      alert('Товар удален из корзины!');
    } catch (error) {
      setError('Error removing item from basket');
      console.error('Error removing item from basket:', error);
    }
  };

  const handleQuantityChange = async (deviceId, quantity) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      await updateBasketQuantity(userId, deviceId, quantity);
      const updatedItems = basketItems.map(item => 
        item.device.id === deviceId ? { ...item, quantity } : item
      );
      setBasketItems(updatedItems);
      calculateTotalPrice(updatedItems); 
    } catch (error) {
      setError('Error updating item quantity');
      console.error('Error updating item quantity:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="basket">
      <h1>Корзина</h1>

      {basketItems.length === 0 ? (
        <p>Ваша корзина пуста!</p>
      ) : (
        <div className="basket-list">
          {basketItems.map(item => (
            <div key={item.device.id} className="basket-item">
              <img 
                src={`http://localhost:5000/${item.device.img}`} 
                alt={item.device.name} 
                style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
              />
              <h2>{item.device.name}</h2>
              <p>{item.device.description}</p>
              <p>Цена: ${item.device.price}</p>
              <div>
                <button onClick={() => handleQuantityChange(item.device.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.device.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveFromBasket(item.device.id)}>Удалить из корзины</button>
            </div>
          ))}
          <div className="basket-total">
            <h3>Общая сумма: ${totalPrice}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;

