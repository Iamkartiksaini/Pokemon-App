"use client";

import React, { memo, useEffect, useState } from 'react'
import { InputField } from './SearchForm';
import { createPortal } from 'react-dom';

const Sidebar = memo(({ activeFilters, listItems, onSearch, resetFilter, pokemonsTypes = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState("");
    const [search, setSearch] = useState(activeFilters.keyword || "");

    useEffect(() => {
        setType(activeFilters.type)
        setSearch(activeFilters.keyword)
    }, [activeFilters])

    const handleSubmit = (e) => {
        onSearch({ type, keyword: search });
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const resetHandler = (e) => {
        setType("")
        setSearch("")
        resetFilter()
    };

    function updateSelectType(e) {
        const value = e.target.value
        setType(value)
    }

    function option(opt, index) {
        return <option value={opt} className="capitalize text-black" key={index}>{opt}</option>
    }

    return (
        <div >
            <button className="toggle-button" onClick={toggleSidebar}>
                <svg style={{ filter: "invert(1)" }} height={24} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
            </button>
            {createPortal(<div className={`sidebar md:hidden ${isOpen ? 'open' : 'closed'}`}>
                <div className="flex justify-between items-center mt-4">
                    <h1 className='font-bold'>Filters</h1>
                    <button className="flex items-center justify-center rounded-lg p-1 hover:bg-gray-600" onClick={toggleSidebar}>
                        <svg style={{ filter: "invert(1)" }} height={24} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </button>
                </div>
                <div className="flex gap-6 items-streach flex-col mt-4">
                    <div className="flex gap-2">
                        <button onClick={handleSubmit} type="submit" className=" w-full py-2 px-4 rounded-sm bg-blue-500 hover:bg-blue-600  text-white">
                            Search
                        </button>
                        <button onClick={resetHandler} type="reset" className=" w-full py-2 px-4 rounded-sm hover:bg-yellow-600 bg-yellow-500 text-black">
                            Reset
                        </button>
                    </div>
                    <select
                        value={type}
                        onChange={updateSelectType}
                        className="mr-2 py-2 px-4 rounded-sm border capitalize border-gray-300"
                    >
                        <option className='text-black' value={""}>All</option>
                        {pokemonsTypes.length > 0 && pokemonsTypes.map(option)}
                    </select>
                    <InputField inputStyle={{ width: "100%" }} search={search} setSearch={setSearch} listItems={listItems || []} />
                </div>
            </div>
                , document.body)}
        </div>
    )
})


export default Sidebar