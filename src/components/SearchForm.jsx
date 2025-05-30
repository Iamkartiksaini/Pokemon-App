"use client";
import { useEffect, useMemo, useState } from "react";
import { HeaderPokemonIcon } from "./Loader";
import Sidebar from "./Sidebar";

export default function SearchForm(props) {
  const { activeFilters, listItems, onSearch, resetFilter, pokemonsTypes = [] } = props
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const memoSidebar = useMemo(() => <Sidebar {...props} />, [activeFilters.type, activeFilters.keyword])

  useEffect(() => {
    setType(activeFilters.type)
    setSearch(activeFilters.keyword)
  }, [activeFilters])

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

  const inputProps = { search, setSearch, listItems }

  return (
    <div className="flex gap-4 flex-wrap justify-between py-4 px-4">
      <div className="flex items-center gap-4 ">
        <HeaderPokemonIcon imgHeight="50px" imgWidth="50px" />
        <h2 className="text-xl md:text-2xl text-red-400 font-bold">Pokémon App</h2>
      </div>
      <div className="max-md:hidden grow-1 flex  flex-wrap gap-4 items-center justify-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mr-2 py-2 px-4 rounded-sm border capitalize border-gray-300"
        >
          <option value="">All</option>
          {pokemonsTypes.length > 0 && pokemonsTypes.map(option)}
        </select>
        <InputField  {...inputProps} />
        <button onClick={handleSubmit} type="submit" className=" py-2 px-4 rounded-sm bg-blue-500 hover:bg-blue-600  text-white">
          Search
        </button>
        <button onClick={resetHandler} type="reset" className=" py-2 px-4 rounded-sm hover:bg-yellow-600 bg-yellow-500 text-black">
          Reset
        </button>
      </div>
      <div className="md:hidden flex items-center">
        {memoSidebar}
      </div>
    </div>
  );
}

export const InputField = ({ search, setSearch, inputStyle = {}, listItems = [] }) => {
  const [text, setText] = useState(search)
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    setText(search)
  }, [search])

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

  function activeFocus() {
    setFocus(true)
  }

  function blurFocus() {
    setFocus(false)
  }

  return <div
    onMouseLeave={blurFocus}
    onMouseEnter={activeFocus}
    style={{ alignItems: "center" }} className="relative h-full flex justify-center InputField">
    <input
      type="text" list="browsers"
      value={text}
      style={inputStyle}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search Pokémon"
      className="py-2 px-4 h-full max-md:h-10 rounded-sm border border-gray-300"
    />
    <ul id="ul_List"
      className={`absolute left-0 top-[100%] w-full max-h-[300px] overflow-y-auto  border-1 border-gray-300 py-2 rounded-b-lg ${focus && "active"}`}>
      {listItems.length > 0 ? listItems.filter((val) => val.name.includes(text)).map(dataListoption) : <p className="px-2 py-2 bg-white cursor-pointer">No results.</p>}
    </ul>
  </div>
}
