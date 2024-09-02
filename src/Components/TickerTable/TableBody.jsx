import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import CustomContextMenu from './CustomContextMenu';
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
    async function deleteTicker(ticker) {
        await fetch(config.API_URL + '/tickers/' + ticker, {
            method: "DELETE"
        })
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        console.log(newRecords)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    return (
        <div className='w-full h-[85%] relative'>

            <div className='border-2 border-slate-500 border-t-0 h-full [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-[#D9D9D9]
                        [&>*:nth-child(even)]:border-slate-200 [&>*:nth-child(odd)]:border-slate-300
                            border-x border-b overflow-y-scroll scrollbar-none'>

                {searchedRecords?.map((record, i) => {
                    return (
                        <TableRow setContextRow={setContextRow} setClicked={setClicked} setPoints={setPoints} key={i} record={record} i={i} header={header} setSelectedTicker={setSelectedTicker} setRecords={setRecords} setSearchedRecords={setSearchedRecords} records={records} searchedRecords={searchedRecords} />
                    ) 
                })}
            </div>
            {clicked && (
                <div style={{top: points.y-150, left: points.x-210}} className='absolute bg border border-black bg-white w-32 py-1'>
                    <ul className='flex flex-col'>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            deleteTicker(contextRow.ticker)
                        }}>Delete</li>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            setSelectedTicker(contextRow)
                        }}>View Details</li>
                    </ul>
                </div>
            )}

        </div>
    )
}
