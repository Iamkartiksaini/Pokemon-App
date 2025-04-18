"use client";
import { useEffect, useState } from "react";
import { HeaderPokemonIcon } from "./Loader";

export default function SearchForm({ listItems, onSearch, resetFilter, pokemonsTypes = [] }) {

  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    onSearch({ type, keyword: search });
  };

  const resetHandler = (e) => {
    setType("")
    setSearch("")
    resetFilter()
  };

  function option(opt, index) {
    return <option value={opt} className="capitalize" key={index}>{opt}</option>
  }

  return (
    <div className="flex gap-4 justify-between py-4 px-4">
      <div className="flex items-center gap-4 ">
        <HeaderPokemonIcon imgHeight="50px" imgWidth="50px" />
        <h2 className="text-xl md:text-3xl text-red-400 font-bold">Pokémon App</h2>
      </div>
      <div className=" grow-1 flex gap-4 items-center justify-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mr-2 py-2 px-4 rounded-sm border capitalize border-gray-300"
        >
          <option value="">All</option>
          {pokemonsTypes.length > 0 && pokemonsTypes.map(option)}
        </select>
        <InputField search={search} setSearch={setSearch} listItems={listItems} />
        <button onClick={handleSubmit} type="submit" className=" py-2 px-4 rounded-sm bg-blue-500 hover:bg-blue-600  text-white">
          Search
        </button>
        <button onClick={resetHandler} type="reset" className=" py-2 px-4 rounded-sm hover:bg-yellow-600 bg-yellow-500 text-black">
          Reset
        </button>
      </div>
    </div>
  );
}

const InputField = ({ search, setSearch, listItems = [] }) => {
  const [text, setText] = useState(search)

  useEffect(() => {
    let tm = null
    if (search == text) return
    tm = setTimeout(() => {
      setSearch(text)
    }, 300)
    return () => tm && clearTimeout(tm)
  }, [text])

  function dataListoption(opt, index) {
    const [firstLetter, ...rest] = opt.name
    const fullText = firstLetter.toUpperCase() + rest.join("")
    return <li className="capitalize px-2 py-2 bg-white cursor-pointer hover:bg-gray-200"
      onClick={(e) => {
        setText(fullText)
      }}
      key={index} > {fullText}</li >
  }

  return <div className="relative h-full InputField">
    <input
      type="text" list="browsers"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search Pokémon"
      className="py-2 px-4 h-full rounded-sm border border-gray-300"
    />
    <ul id="ul_List"
      className={`absolute left-0 top-[100%] w-full max-h-[300px] overflow-y-auto  border-1 border-gray-300 py-2 rounded-b-lg`}>
      {listItems.length > 0 ? listItems.map(dataListoption) : <p className="px-2 py-2 bg-white cursor-pointer">No results.</p>}
    </ul>
  </div>
}
