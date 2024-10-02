import React, { useEffect } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

export default function Details({ selectedTicker }) {
    useEffect(() => {
        console.log(selectedTicker)
    }, [selectedTicker])
    return (
        <div className='w-full h-[90%]  bg-[#CCE1F6]'>
            {selectedTicker?.ticker ? (
                <div className='flex flex-col h-full text-xl'>
                    <div className='w-full border-collapse h-[100%] overflow-y-scroll scrollbar-none'>
                        <TableBody ticker={selectedTicker} />
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center w-full h-[90%] text-black text-xl '>Please select a ticker to show its details :)</div>
            )}

        </div>
    )
}
