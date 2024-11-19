import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'

const ScreenLoader = () => {
    return (
        <div className='h-[75vh] w-full flex items-center justify-center'>
            <BiLoaderCircle className='h-8 w-8 duration-100 animate-spin' />
        </div>
    )
}

export default ScreenLoader