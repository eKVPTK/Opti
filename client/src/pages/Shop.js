// src/pages/Shop.js
import React, { useEffect, useState } from 'react';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'; // Импортируем Link

const Shop = observer(() => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 9;

  const loadData = async () => {
    try {
      const brandsData = await fetchBrands();
      setBrands(brandsData);

      const typesData = await fetchTypes();
      setTypes(typesData);

      const devicesData = await fetchDevices(selectedType, selectedBrand, page, limit);
      setDevices(devicesData.rows); // Присваиваем полученные товары в состояние
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedBrand, selectedType, page]); // Обновляем список при изменении фильтров и страницы

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setPage(1); // Сброс страницы на первую при изменении фильтра
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setPage(1); // Сброс страницы на первую при изменении фильтра
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) setPage(newPage);
  };

  return (
    <div className="shop">
      <h1>Shop</h1>

      <div className="filters">
        <select onChange={handleBrandChange} value={selectedBrand || ''}>
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>

        <select onChange={handleTypeChange} value={selectedType || ''}>
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div className="device-list">
        {devices.length === 0 ? (
          <p>Товаров пока нет!</p>
        ) : (
          devices.map(device => (
            <div key={device.id} className="device-item">
              <Link to={`/device/${device.id}`}>
                <img
                  src={`http://localhost:5000/${device.img}`}
                  alt={device.name}
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
                <h2>{device.name}</h2>
              </Link>
              <p>{device.description}</p>
              <p>{device.price} руб.</p>
            </div>
          ))
        )}
      </div>

      {devices.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
});

export default Shop;
