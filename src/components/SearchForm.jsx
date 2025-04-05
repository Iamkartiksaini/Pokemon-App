"use client";
import { useMemo, useState } from "react";

export default function SearchForm({ listItems, onSearch, resetFilter, pokemonsTypes = [] }) {

  const listMemo = useMemo(() => listItems, [])
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ selectType: type, search });
  };

  const resetHandler = (e) => {
    setType("")
    setSearch("")
    resetFilter()
  };

  function option(opt, index) {
    return <option value={opt} className="capitalize" key={index}>{opt}</option>
  }

  function dataListoption(opt, index) {
    const [firstLetter, ...rest] = opt.name
    const fullText = firstLetter.toUpperCase() + rest.join("")
    return <option className="capitalize bg-red-300" value={fullText} key={index} />
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4 justify-center">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mr-2 py-2 px-4 rounded-sm border capitalize border-gray-300"
      >
        <option value="">All</option>
        {pokemonsTypes.length > 0 && pokemonsTypes.map(option)}
      </select>
      <input
        type="text" list="browsers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon"
        className="py-2 px-4 rounded-sm border border-gray-300"
      />
      <datalist id="browsers">
        {listMemo.length > 0 && listMemo.map(dataListoption)}
      </datalist>
      <button type="submit" className=" py-2 px-4 rounded-sm bg-blue-500 hover:bg-blue-600  text-white">
        Search
      </button>
      <button onClick={resetHandler} type="reset" className=" py-2 px-4 rounded-sm hover:bg-yellow-600 bg-yellow-500 text-black">
        Reset
      </button>
    </form>
  );
}