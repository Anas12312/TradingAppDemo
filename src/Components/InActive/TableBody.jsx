import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import config from '../../../config.json'
export default function TableBody({ searchedRecords, records, header, setSelectedTicker, setRecords, setSearchedRecords }) {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    const [contextRow, setContextRow] = useState({})
    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    async function activeTicker(ticker) {
        await fetch(config.API_URL + '/tickers/active/' + ticker, {
            method: "POST"
        })
        await fetch(config.API_URL + '/tickers/refresh')
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    return (
        <div className='w-full h-[80%] relative'>

            <div className=' h-full [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-blue-100
                            border-b border-blue-700 overflow-y-scroll scrollbar-none'>

                {searchedRecords?.map((record, i) => {
                    return (
                        <TableRow setContextRow={setContextRow} setClicked={setClicked} setPoints={setPoints} key={i} record={record} i={i} header={header} setSelectedTicker={setSelectedTicker} setRecords={setRecords} setSearchedRecords={setSearchedRecords} records={records} searchedRecords={searchedRecords} />
                    ) 
                })}
            </div>
            {clicked && (
                <div style={{top: points.y-210, left: points.x-210}} className='absolute bg border border-black bg-white w-40 py-1'>
                    <ul className='flex flex-col'>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            activeTicker(contextRow.ticker)
                        }}>Activate</li>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            setSelectedTicker(contextRow)
                        }}>View Details</li>
                    </ul>
                </div>
            )}

        </div>
    )
}
