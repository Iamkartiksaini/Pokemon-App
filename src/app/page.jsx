"use client"
import { useState, useEffect, Fragment } from 'react';
import SearchForm from '../components/SearchForm';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemons } from '@/utils/api';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import useLocalStorage from '@/hook/useStorage';

export default function Page() {
  const [apiData, setData] = useState(null);
  const [localDataArr, setLocalDataArr] = useState(null);
  const { loadedPagesData, pokemonTypes, getData, saveNewData } = useLocalStorage()

  const getDataFromApi = async (type, search) => {
    const data = await fetchPokemons(0);
    setData(data);
    setLocalDataArr(data.data)
  };

  useEffect(() => {
    getDataFromApi(0)
  }, [])


  useEffect(() => {
    if (localDataArr !== null) {
      saveNewData({ key: "1", data: localDataArr })
    }
  }, [apiData])

  useEffect(() => {
    if (loadedPagesData !== null) {
      const flatObj = Object.entries(loadedPagesData).flatMap(([key, val]) => val)
      setLocalDataArr(flatObj)
    }
  }, [loadedPagesData])

  async function handlePageChange({ key }) {
    // debugger
    const isAlreadyFetched = getData({ key })
    if (isAlreadyFetched) {
      setLocalDataArr(isAlreadyFetched)
    }
    else {
      const data = await fetchPokemons(key)
      saveNewData({ key, data: data.data })
    }
  }

  if (!apiData) {
    return <Loader />
  }

  const filterHandler = ({ selectType, search }) => {
    const filteredData = localDataArr.filter((val) => {
      const matchesSearch = search === "" || val.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectType ? val.types.includes(selectType) : true;

      return matchesSearch && matchesType;
    });

    setLocalDataArr(filteredData);
  };

  const resetFilter = () => {
    if (loadedPagesData !== null) {
      const flatObj = Object.entries(loadedPagesData).flatMap(([key, val]) => val)
      setLocalDataArr(flatObj)
    };
  };

  function cardRender(data, index) {
    return <Fragment key={index}>
      <PokemonCard index={index} pokemon={data} />
    </Fragment>
  }

  return (
    <div className='p-4'>
      <header className='sticky z-10 top-0  bg-white py-2 px-4  shadow-black-50  shadow-2xl  rounded-b-lg mb-6'>
        <SearchForm listItems={localDataArr} pokemonsTypes={pokemonTypes || []} resetFilter={resetFilter} onSearch={filterHandler} />
      </header>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {localDataArr.map(cardRender)}
      </div>
      <Pagination handlePageChange={handlePageChange} activeItemsCount={localDataArr} totalItems={apiData.count} />
    </div>
  );
}
