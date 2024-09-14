import React, { useEffect } from 'react'

export default function TableRow({ property, value }) {

    return (
        <div className="w-full h-full flex relative border border-t-0 ">
            <div className='w-[25%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                {property}
            </div>
            <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                {value}
            </div>

        </div>
    )
}
