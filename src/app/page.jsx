"use client"
import { useState, useEffect, Fragment } from 'react';
import SearchForm from '../components/SearchForm';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemons } from '@/utils/api';

export default function Page() {
  const [apiData, setData] = useState(null);
  const [localDataArr, setLocalDataArr] = useState(null);

  const getDataFromApi = async (type, search) => {
    const data = await fetchPokemons(type, search);
    setData(data);
    setLocalDataArr(data.data)
  };

  useEffect(() => {
    getDataFromApi()
  }, []);

  if (!apiData) {
    return <h1>Loading....</h1>
  }
  const filterHandler = ({ selectType, search }) => {
    const filteredData = apiData.data.filter((val) => {
      const matchesSearch = search === "" || val.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectType ? val.types.includes(selectType) : true;

      return matchesSearch && matchesType;
    });

    setLocalDataArr(filteredData);
  };



  function cardRender(data, index) {
    return <Fragment key={index}>
      <PokemonCard index={index} pokemon={data} />
    </Fragment>
  }

  return (
    <div className='p-4'>
      <header className='sticky z-10 top-0  bg-white py-2 px-4  shadow-black-50  shadow-2xl  rounded-b-lg mb-6'>
        <SearchForm pokemonsTypes={apiData.pokemonsTypes} onSearch={filterHandler} />
      </header>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {localDataArr.map(cardRender)}
      </div>
    </div>
  );
}
