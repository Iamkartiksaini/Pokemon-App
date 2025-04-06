"use client"
import { useState, useEffect, Fragment, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import PokemonCard, { ObserverComponent } from '../components/PokemonCard';
import { fetchPokemons } from '@/utils/api';
import Loader from '@/components/Loader';
// import Pagination from '@/components/Pagination';
import { useStoreValues } from '@/store/PokemonStore';

export default function Page() {
  const { storageItems, storagePokemonTypes, getData, saveNewData } = useStoreValues()
  const [apiData, setData] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ type: "", keyword: "" })

  const getDataFromApi = useCallback(async () => {
    const resp = await fetchPokemons(0);
    setData(resp)
    saveNewData({ key: "0", data: resp.data })
  }, []);

  useEffect(() => {
    getDataFromApi()
  }, [])

  async function handlePageChange({ key }) {
    const isAlreadyFetched = getData({ key })
    if (isAlreadyFetched) {
      return
    }
    else {
      const data = await fetchPokemons(key)
      saveNewData({ key, data: data.data })
    }
  }

  if (!apiData || !storageItems) {
    return <Loader />
  }

  const resetFilter = () => {
    setActiveFilters({ type: "", keyword: "" })
  };

  let localDataArr = [...storageItems].filter((val) => {
    const matchesSearch = activeFilters.keyword === "" || val.name.toLowerCase().includes(activeFilters.keyword.toLowerCase());
    const matchesType = activeFilters.type ? val.types.includes(activeFilters.type) : true;
    return matchesSearch && matchesType;
  });

  function cardRender(data, index) {
    if (index == storageItems.length - 1) {
      return <Fragment key={index}>
        <ObserverComponent handlePageChange={handlePageChange} currentItemsArr={storageItems} index={index} pokemon={data} />
      </Fragment>
    }
    else {
      return <Fragment key={index}>
        <PokemonCard index={index} pokemon={data} />
      </Fragment>
    }
  }

  return (
    <div className='p-4'>
      <header className='sticky z-10 top-2  bg-white border-2 border-gray-100  shadow-black-50  shadow-2xl  rounded-lg mb-6'>
        <SearchForm listItems={storageItems} pokemonsTypes={storagePokemonTypes || []} resetFilter={resetFilter} onSearch={setActiveFilters} />
      </header>
      {localDataArr.length == 0 ? <h3 className='text-center'>No Result Found</h3> : <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {localDataArr.map(cardRender)}
      </div>}
      {/* <Pagination handlePageChange={handlePageChange} activeItemsCount={localDataArr} totalItems={apiData.count} /> */}
    </div>
  );
}


