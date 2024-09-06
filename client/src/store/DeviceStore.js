import React, { createContext, useContext, useState } from 'react';

const DeviceContext = createContext();

export const DeviceStoreProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const addDevice = (device) => {
    setDevices((prev) => [...prev, device]);
  };

  const setDeviceData = (deviceData) => {
    setDevices(deviceData);
  };

  const setBrandData = (brandData) => {
    setBrands(brandData);
  };

  const setTypeData = (typeData) => {
    setTypes(typeData);
  };

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const selectType = (type) => {
    setSelectedType(type);
  };

  return (
    <DeviceContext.Provider value={{ devices, brands, types, selectedBrand, selectedType, addDevice, setDeviceData, setBrandData, setTypeData, selectBrand, selectType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceStore = () => useContext(DeviceContext);
