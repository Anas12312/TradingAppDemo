import React from 'react'
import TableRow from './TableRow'

export default function TableBody({ ticker }) {
    return (
        <div className='w-full h-[100%]'>

            <div className='border-2 h-full
                        [&>*:nth-child(even)]:border-slate-200 [&>*:nth-child(odd)]:border-slate-300
                            border-x border-b overflow-y-scroll scrollbar-none'>
                {Object.keys(ticker).map((key, i) => {
                    return (
                        <TableRow key={i} property={key} value={ticker[key]} />
                    )
                })}
            </div>

        </div>
    )
}
