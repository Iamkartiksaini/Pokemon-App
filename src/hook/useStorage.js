"use client";
import { useEffect, useState } from "react";
const pokemonDataKey = "pokemon-app-data";
const pokemonDataTypesKey = "pokemon-app-pokemon-type";

const initTypes = new Set();

const useLocalStorage = () => {
  const [loadedPagesData, setLoadedPagesData] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState(initTypes);

  useEffect(() => {
    if (window) {
      const storageData = localStorage.getItem(pokemonDataKey);
      const parseData = pokemonDataKey ? JSON.parse(storageData) : null;
      if (parseData) {
        setLoadedPagesData(parseData);
      }
    }
  }, []);

  useEffect(() => {
    if (loadedPagesData) {
      saveTypesOfPokemon(loadedPagesData);
    }
  }, [loadedPagesData]);

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
    setLoadedPagesData(newlyData);
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
    setPokemonTypes(uniqueTypes);
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

  return { loadedPagesData, getData, saveNewData, pokemonTypes };
};

export default useLocalStorage;
