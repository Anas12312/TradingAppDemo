import React, { useEffect } from 'react'
import SORT from '../../../images/sort.png'
import SORT_UP from '../../../images/sort-up.png'
import SORT_DOWN from '../../../images/sort-down.png'
export default function TableHeader() {

    return (
        <div className='border-b border-slate-500 select-none w-full bg-[#ECECEC] h-[15%] flex items-center justify-start text-[1rem] shadow font-Sansation-Bold border-t'>
            <div className='relative w-[3%] h-full flex justify-center items-center text-center border-x border-slate-500 text-base'>
                no.
            </div>
        </div>
    )
}
