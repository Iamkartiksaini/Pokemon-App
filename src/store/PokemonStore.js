"use client";
import { fetchPokemons } from "@/utils/api";
import React, { createContext, useState, useEffect, useContext } from "react";

const pokemonDataKey = "pokemon-app-data";
const pokemonDataTypesKey = "pokemon-app-pokemon-type";

const initItems = new Set();
const initPokemonTypes = new Set();

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [storageItems, setStorageItems] = useState(null);
  const [storagePokemonTypes, setStoragePokemonTypes] =
    useState(initPokemonTypes);

  useEffect(() => {
    if (window) {
      const storageData = localStorage.getItem(pokemonDataKey);
      const parseData = storageData ? JSON.parse(storageData) : null;
      if (parseData) {
        setStorageItems(parseData);
      }
    }
  }, []);

  function saveNewData({ key, data }) {
    const storageData = localStorage.getItem(pokemonDataKey);
    const items = JSON.parse(storageData);
    let newlyData = null;
    if (items) {
      newlyData = { ...items, [key]: data };
    } else {
      newlyData = { [key]: data };
    }
    const str = JSON.stringify(newlyData);
    localStorage.setItem(pokemonDataKey, str);
    setStorageItems(newlyData);
    saveTypesOfPokemon(newlyData);
  }

  function saveTypesOfPokemon(data) {
    if (!data) return;
    const x = Object.entries(data).map(([key, val], index) => {
      return val.flatMap((t) => t.types);
    });
    const unquieObj = new Set(x.flatMap((val) => val));
    const uniqueTypes = Array.from(unquieObj);
    localStorage.setItem(pokemonDataTypesKey, JSON.stringify(uniqueTypes));
    setStoragePokemonTypes(uniqueTypes);
  }

  function getData({ key }) {
    let value = null;
    const storageData = localStorage.getItem(pokemonDataKey);
    const items = JSON.parse(storageData);
    if (items && items[key]) {
      value = items[key];
    }
    return value;
  }

  const flatObj = storageItems
    ? Object.entries(storageItems).flatMap(([key, val]) => val)
    : null;

  return (
    <StoreContext.Provider
      value={{
        storageItems: flatObj,
        getData,
        saveNewData,
        storagePokemonTypes,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreValues = () => useContext(StoreContext);

export default StoreContextProvider;
