import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
export default function TableRow({ record, i, header, setSelectedTicker, setRecords, setSearchedRecords, records, searchedRecords }) {

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
    }, [record])

    const toggleCheck = async () => {
        const newRecords = records.map((r) => {
            if(r.Ticker == record.Ticker) {
                return {
                    ...r,
                    Check: !record.Check
                }
            }else {
                return r
            }
        })
        const newSearchedRecords = searchedRecords.map((r) => {
            if(r.Ticker == record.Ticker) {
                return {
                    ...r,
                    Check: !record.Check
                }
            }else {
                return r
            }
        })
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
        await fetch(config.API_URL + '/tickers/check/' + record.Ticker, {
            method: "POST"
        })
        
    }
    return (
        <tr className="w-full flex h-[3rem] relative cursor-pointer" onClick={(e) => { setSelectedTicker(record); console.log(e.target) }}>
            {/* <div className='absolute w-full h-full bg-black bg-opacity-0 hover:bg-opacity-30 cursor-pointer'></div> */}
            <td className='w-[3%] h-full flex justify-center items-center text-center'>
                {i + 1}
            </td>
            <td className='w-[6%] h-full flex justify-center items-center text-center' onClick={(e) => {
                e.stopPropagation()
                toggleCheck()
            }} >
                <input className='' type="checkbox" checked={record.Check} />
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.Ticker}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.Price}
            </td>
            {
                header.map((h) => {
                    if(h.name == "Ticker") return
                    if(h.name == "Price") return
                    return (
                        <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                            {record[h.name]}
                        </td>
                    )
                })
            }

        </tr>
    )
}
