import React, { useEffect } from 'react'

export default function TableRow({ property, value }) {

    return (
        <div className="w-full flex h-[3rem] relative">
            <div className='w-[30%] text-lg font-semibold h-full flex justify-start items-center text-center truncate border-r-2 border-slate-300 border bg-gray-200 pl-2'>
                {property}
            </div>
            <div className='w-[70%] h-full flex justify-start items-center text-start truncate pl-5 border'>
                {value}
            </div>

        </div>
    )
}
