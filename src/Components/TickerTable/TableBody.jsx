import React from 'react'
import TableRow from './TableRow'

export default function TableBody({ searchedRecords, records, header, setSelectedTicker, setRecords, setSearchedRecords }) {
    return (
        <div className='w-full h-[85%]'>

            <div className='border-2 border-slate-500 border-t-0 h-full [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-[#D9D9D9]
                        [&>*:nth-child(even)]:border-slate-200 [&>*:nth-child(odd)]:border-slate-300
                            border-x border-b overflow-y-scroll scrollbar-none'>
                {searchedRecords?.map((record, i) => {
                    return (
                        <TableRow key={i} record={record} i={i} header={header} setSelectedTicker={setSelectedTicker} setRecords={setRecords} setSearchedRecords={setSearchedRecords} records={records} searchedRecords={searchedRecords} />
                    )
                })}
            </div>

        </div>
    )
}
