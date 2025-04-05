import Image from 'next/image'
import React from 'react'


const Loader = () => {
    const img = ["5", "8", "9", "10", "11", "15", "17"];

    const randomIndex = Math.floor(Math.random() * img.length);
    const randomImage = img[randomIndex];

    return (
        <div className='flex flex-col h-screen justify-center items-center gap-4'>
            <Image width={120} height={120} src={`/assets/${randomImage}.svg`} alt='Pokemon' />
            <h1>Loading...</h1>
        </div>
    );
};


export default Loader