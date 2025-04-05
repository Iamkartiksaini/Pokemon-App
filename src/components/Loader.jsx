"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Loader = () => {
    try {
        const [randomIndex, setRandomIndex] = useState(0)
        const img = ["5", "8", "9", "10", "11", "15", "17"];

        useEffect(() => {
            const x = Math.floor(Math.random() * img.length);
            setRandomIndex(x)
        }, [])
        const randomImage = img[randomIndex];

        return (
            <div className='flex flex-col h-screen justify-center items-center gap-4'>
                <Image style={{ width: "120px", height: "120px" }} width={120} height={120} src={`/assets/${randomImage}.svg`} alt='Pokemon' />
                <h1>Loading...</h1>
            </div>
        );
    } catch (error) {
        <div className='flex flex-col h-screen justify-center items-center gap-4'>
            <Image style={{ width: "120px", height: "120px" }} width={120} height={120} src={`/assets/5.svg`} alt='Pokemon' />
            <h1>Loading...</h1>
        </div>
    }
};


export default Loader