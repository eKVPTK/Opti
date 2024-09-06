import React, { useState } from 'react';
import { createType, createBrand } from '../http/deviceAPI'; 

const Admin = () => {
  const [typeName, setTypeName] = useState(''); 
  const [brandName, setBrandName] = useState(''); 
  const handleAddType = async () => {
    if (!typeName.trim()) {
      alert("Введите название типа");
      return;
    }

    try {
      await createType({ name: typeName });
      alert("Тип успешно добавлен!");
      setTypeName('');
    } catch (error) {
      console.error('Ошибка при добавлении типа:', error);
      alert("Ошибка при добавлении типа");
    }
  };

  const handleAddBrand = async () => {
    if (!brandName.trim()) {
      alert("Введите название бренда");
      return;
    }

    try {
      await createBrand({ name: brandName });
      alert("Бренд успешно добавлен!");
      setBrandName(''); 
    } catch (error) {
      console.error('Ошибка при добавлении бренда:', error);
      alert("Ошибка при добавлении бренда");
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      
      <div>
        <h2>Добавить новый тип устройства</h2>
        <input
          type="text"
          placeholder="Введите название типа"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
        <button onClick={handleAddType}>Добавить тип</button>
      </div>
      
      <div>
        <h2>Добавить новый бренд</h2>
        <input
          type="text"
          placeholder="Введите название бренда"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <button onClick={handleAddBrand}>Добавить бренд</button>
      </div>
    </div>
  );
};

export default Admin;

