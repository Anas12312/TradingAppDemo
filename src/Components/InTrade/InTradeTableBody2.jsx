import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
import InTradeTableRow from './InTradeTableRow';
import InTradeTableRow2 from './InTradeTableRow2';
export default function InTradeTableBody2({ searchedRecords, records, header, setSelectedTicker, setRecords, setSearchedRecords }) {
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
    async function detradeTicker(ticker) {
        await fetch(config.API_URL + '/tickers/detrade/' + ticker, {
            method: "POST"
        })
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    return (
        <div className='w-full h-[70%] relative'>

            <div className=' h-full [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-blue-100
                            border-b border-blue-700 overflow-y-scroll scrollbar-none'>

                {searchedRecords?.map((record, i) => {
                    if(i % 2 == 0) return
                    return (
                        <InTradeTableRow2 setContextRow={setContextRow} setClicked={setClicked} setPoints={setPoints} key={i} record={record} i={i} header={header} setSelectedTicker={setSelectedTicker} setRecords={setRecords} setSearchedRecords={setSearchedRecords} records={records} searchedRecords={searchedRecords} />
                    ) 
                })}
            </div>
            {clicked && (
                <div style={{top: points.y-210, left: points.x-1000}} className='absolute bg border border-black bg-white w-40 py-1'>
                    <ul className='flex flex-col'>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            detradeTicker(contextRow.ticker)
                        }}>Detrade</li>
                        <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                            setSelectedTicker(contextRow)
                        }}>View Details</li>
                    </ul>
                </div>
            )}

        </div>
    )
}
