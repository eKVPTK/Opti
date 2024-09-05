import React, { useEffect, useState } from 'react';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/auth'; 

const CreateDevicePage = () => {
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const userId = getUserIdFromToken();
  const phonePattern = /^((\+7)|8)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes().then(data => setTypes(data));
    fetchBrands().then(data => setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    if (name.length <= 4) {
      setError('Название устройства/услуги не должно быть меньше 4 символов');
      return;
    } else if (price > 1_000_000_000) {
      setError('Некорректное значение стоимости');
      return;
    } else if (!description) {
      setError('Описание не должно быть пустым');
      return;
    } else if (!phonePattern.test(phone)) {
      setError('Некорректный телефон');
      return;
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', `${price}`);
      formData.append('description', description);
      formData.append('img', file);
      formData.append('brandId', selectedBrand);
      formData.append('typeId', selectedType);
      formData.append('info', JSON.stringify(info));
      formData.append('phone', phone);
      formData.append('userId', userId);

      createDevice(formData).then(data => navigate('/devices'));
    }
  };

  return (
    <div>
      <h2>Добавить товар/услугу</h2>
      
      <div>
        <label>Тип:</label>
        <select onChange={e => setSelectedType(e.target.value)}>
          <option value="">Выберите тип</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Бренд:</label>
        <select onChange={e => setSelectedBrand(e.target.value)}>
          <option value="">Выберите бренд</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>

      <span style={{ color: 'red' }}>{error}</span>

      <div>
        <label>Название устройства/услуги:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Введите название устройства/услуги"
        />
      </div>

      <div>
        <label>Стоимость:</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Введите стоимость устройства/услуги"
        />
      </div>

      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Введите описание устройства/услуги"
        />
      </div>

      <div>
        <label>Телефон для связи:</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Введите телефон для связи с поставщиком"
        />
      </div>

      <div>
        <label>Изображение:</label>
        <input
          type="file"
          onChange={selectFile}
        />
      </div>

      <hr />

      <button onClick={addInfo}>Добавить новое свойство</button>
      {info.map(i =>
        <div key={i.number}>
          <input
            value={i.title}
            onChange={(e) => changeInfo('title', e.target.value, i.number)}
            placeholder="Введите название свойства"
          />
          <input
            value={i.description}
            onChange={(e) => changeInfo('description', e.target.value, i.number)}
            placeholder="Введите описание свойства"
          />
          <button onClick={() => removeInfo(i.number)}>Удалить</button>
        </div>
      )}

      <button onClick={addDevice}>Добавить</button>
    </div>
  );
};

export default CreateDevicePage;
