import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

export default function Details({ selectedTicker }) {
    return (
        <div className='w-full h-[90%] border-l border-t'>
            {selectedTicker.ticker ? (
                <div className='flex flex-col h-full text-xl p-3'>
                    <div className='w-full border-collapse h-[100%] overflow-y-scroll scrollbar-none'>
                        <TableBody ticker={selectedTicker} />
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center w-full h-full text-xl'>Please select a ticker to show its details :)</div>
            )}

        </div>
    )
}
