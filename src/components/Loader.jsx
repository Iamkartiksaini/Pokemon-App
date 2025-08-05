"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Loader = ({ height = "100vh" }) => {
    function Section({ src }) {
        const contianerClass = 'flex flex-col justify-center items-center gap-4 h-screen'
        return <div style={{ height }} className={contianerClass} >
            <div className='bg-neutral-100 border-2 border-cyan-400 p-6 rounded-full'>
                <Image style={{ width: "120px", height: "120px" }} width={120} src={src} height={120} alt='Pokemon' />
            </div>
            <p className='text-2xl font-medium'>Loading...</p>
        </div>
    }

    try {
        const [randomIndex, setRandomIndex] = useState(0)
        const img = ["5", "8", "9", "10", "11", "15", "17"];

        useEffect(() => {
            const x = Math.floor(Math.random() * img.length);
            setRandomIndex(x)
        }, [])
        const randomImage = img[randomIndex];

        return <Section src={`/assets/${randomImage}.svg`} />
    } catch (error) {
        return <Section src={`/assets/5.svg`} />
    }
};

export const HeaderPokemonIcon = ({ imgHeight = "60px", imgWidth = "60px" }) => {
    function Section({ src }) {
        const contianerClass = 'flex flex-col justify-center items-center gap-4'
        return <div className={contianerClass} >
            <Image style={{ width: imgWidth, height: imgHeight }} width={120} src={src} height={120} alt='Pokemon' />
        </div>
    }
    try {
        const [randomIndex, setRandomIndex] = useState(0)
        const img = ["5", "8", "9", "10", "11", "15", "17"];

        useEffect(() => {
            const x = Math.floor(Math.random() * img.length);
            setRandomIndex(x)
        }, [])
        const randomImage = img[randomIndex];


        return <Section src={`/assets/${randomImage}.svg`} />
    } catch (error) {
        return <Section src={`/assets/5.svg`} />
    }
};

export default Loader