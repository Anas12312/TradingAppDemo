import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import config from '../../../config.json'


export default function TableContent({ searchedRecords, records, header, setSelectedTicker, setRecords, setSearchedRecords, selectedTicker, setIdle, timer }) {
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
    async function dismissTicker(ticker) {
        await fetch(config.API_URL + '/tickers/refresh')
        await fetch(config.API_URL + '/tickers/dismiss/' + ticker, {
            method: "POST"
        })
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        console.log(newRecords)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    async function activateTicker(ticker) {
        await fetch(config.API_URL + '/tickers/activate/' + ticker, {
            method: "POST"
        })
        await fetch(config.API_URL + '/tickers/refresh')
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        console.log(newRecords)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    async function deactivateTicker(ticker) {
        await fetch(config.API_URL + '/tickers/refresh')
        await fetch(config.API_URL + '/tickers/deactivate/' + ticker, {
            method: "POST"
        })
        const newRecords = records.filter(r => r.ticker !== ticker)
        const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        console.log(newRecords)
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
    }
    return (

        <div className='w-full h-[80%] relative px-2'>
                    <div className=' h-full 
                                    border-b border-blue-700 overflow-y-scroll scrollbar-none'>

                        {searchedRecords?.map((record, i) => {
                            return (
                                <TableRow timer={timer} setIdle={setIdle} setContextRow={setContextRow} setClicked={setClicked} selectedTicker={selectedTicker} setPoints={setPoints} key={i} record={record} i={i} header={header} setSelectedTicker={setSelectedTicker} setRecords={setRecords} setSearchedRecords={setSearchedRecords} records={records} searchedRecords={searchedRecords} />
                            )
                        })}
                    </div>
                    {clicked && (
                        <div style={{ top: points.y - 210, left: points.x - 210 }} className='absolute bg border border-black bg-white w-40 py-1'>
                            <ul className='flex flex-col'>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    dismissTicker(contextRow.ticker)
                                }}>Dismiss</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    setSelectedTicker(contextRow)
                                }}>View Details</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    activateTicker(contextRow)
                                }}>Activate Alerts</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    deactivateTicker(contextRow)
                                }}>Deactivate Alerts</li>
                            </ul>
                        </div>
                    )}

                </div>
    )
}
