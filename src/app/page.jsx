"use client"
import { useState, useEffect, Fragment, useCallback, useDeferredValue, } from 'react';
import SearchForm from '../components/SearchForm';
import PokemonCard, { ObserverComponent } from '../components/PokemonCard';
import { fetchPokemons } from '@/utils/api';
import Loader from '@/components/Loader';
// import Pagination from '@/components/Pagination';
import StoreContextProvider, { useStoreValues } from '@/store/PokemonStore';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Page() {
  return <StoreContextProvider><PageData /></StoreContextProvider>
}

function PageData() {
  const { storageItems, storagePokemonTypes, getData, saveNewData } = useStoreValues()
  const deferredValue = useDeferredValue(storageItems, []);
  const [apiData, setData] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ type: "", keyword: "" })

  const getDataFromApi = useCallback(async () => {
    const resp = await fetchPokemons(0);
    setData(resp)
    saveNewData({ key: "0", data: resp.data })
  }, []);

  useEffect(() => {
    getDataFromApi()
    AOS.init({
      duration: 1000,
      once: true
    });
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


  let localDataArr = deferredValue.filter((val) => {
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

  const headerProps = { activeFilters, listItems: storageItems, pokemonsTypes: storagePokemonTypes || [], resetFilter, onSearch: setActiveFilters }

  return (
    <div className='p-4 relative w-full'>
      <header
        style={{ backgroundColor: "#ffffff8f", backdropFilter: "blur(3px)" }}
        className='Header w-full z-10  border-2 border-gray-100  shadow-black-50  shadow-2xl  rounded-lg mb-6'>
        <SearchForm {...headerProps} />
      </header>

      {localDataArr.length == 0 ? <h3 className='text-center'>No Result Found</h3> : <main className="Gallery relative z-[2] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {localDataArr.map(cardRender)}
      </main>}
      <div id="moreItemLoader"></div>
      {/* <Pagination handlePageChange={handlePageChange} activeItemsCount={localDataArr} totalItems={apiData.count} /> */}
    </div>
  );
}


