"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Loader = ({ height = " h-screen", imgHeight = "120px", imgWidth = "120px" }) => {
    try {
        const [randomIndex, setRandomIndex] = useState(0)
        const img = ["5", "8", "9", "10", "11", "15", "17"];

        useEffect(() => {
            const x = Math.floor(Math.random() * img.length);
            setRandomIndex(x)
        }, [])
        const randomImage = img[randomIndex];

        const contianerClass = 'flex flex-col justify-center items-center gap-4 ' + height
        return (
            <div className={contianerClass} >
                <Image style={{ width: imgWidth, height: imgHeight }} width={120} height={120} src={`/assets/${randomImage}.svg`} alt='Pokemon' />
                {!height && <h1>Loading...</h1>}
            </div>
        );
    } catch (error) {
        const contianerClass = 'flex flex-col justify-center items-center gap-4 ' + height;
        return <div div className={contianerClass} >
            <Image style={{ width: imgWidth, height: imgHeight }} width={120} height={120} src={`/assets/5.svg`} alt='Pokemon' />
            {!height && <h1>Loading...</h1>}

        </div >
    }
};

export default Loader