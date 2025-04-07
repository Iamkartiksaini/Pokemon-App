"use client";
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import Select from 'react-select';

const formatOptions = (menu) => {
    return menu.map(([key, value]) => ({
        label: key,
        options: Object.entries(value).map(([valKey, data]) => ({
            label: valKey,
            value: data,
        })).filter((opt) => opt.value !== null && opt.value != "")
    }));
};


const MultiImageViewer = ({ options, name, defaultImageSrc, height = 200, width = 200 }) => {
    const [activeImageUrl, setImageUrl] = useState(defaultImageSrc)
    const menuItems = useMemo(() => formatOptions(Object.entries(options.other)), []);

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            setImageUrl(selectedOption.value);
        }
    };

    return (
        <div className='flex flex-col gap-3'>
            <Image height={height} width={width} style={{ width, height }} src={activeImageUrl} alt={name} />
            <Select
                options={menuItems}
                onChange={handleChange}
                isClearable
                placeholder="Select an option"
                isSearchable
            />
        </div>
    )
}

export default MultiImageViewer