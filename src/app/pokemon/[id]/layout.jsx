import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children }) => {
    const parentStyle = "flex flex-col justify-center gap-4 min-h-[calc(100vh_-_100px)] items-center"
    return (
        <div >
            <div className='flex items-center gap-5   bg-white py-2 px-4  shadow-black-50  shadow-2xl  rounded-b-lg mb-6'>
                <Link className='border-2 hover:text-amber-600  hover:border-amber-600 py-1 px-3 m-0 h-fit text-blue-400  border-blue-400 rounded-sm' href={"/"}> ← Back</Link>
                <Breadcrumb />
            </div>
            <div className={parentStyle}>
                {children}
            </div>
        </div>
    )
}

export default Layout