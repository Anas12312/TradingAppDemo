import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
export default function TableRow({ setContextRow, setClicked, setPoints, record, i, header, setSelectedTicker, setRecords, setSearchedRecords, records, searchedRecords }) {

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
    }, [record])

    const toggleCheck = async () => {
        const newRecords = records.map((r) => {
            if (r.ticker == record.ticker) {
                return {
                    ...r,
                    Check: !record.Check
                }
            } else {
                return r
            }
        })
        const newSearchedRecords = searchedRecords.map((r) => {
            if (r.ticker == record.ticker) {
                return {
                    ...r,
                    Check: !record.Check
                }
            } else {
                return r
            }
        })
        setRecords(newRecords)
        setSearchedRecords(newSearchedRecords)
        await fetch(config.API_URL + '/tickers/check/' + record.ticker, {
            method: "POST"
        })

    }

    return (
        <tr onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setContextRow(record)
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            // console.log("Right Click", e.pageX, e.pageY);
        }}
            className="w-full flex h-[3rem] relative cursor-pointer" onClick={(e) => { setSelectedTicker(record); console.log(e.target) }}>
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
                {record.ticker}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.price}
            </td>
            {
                header.filter((h) => {
                    return (
                        h.name === 'sector' ||
                        h.name === 'momocount' ||
                        h.name === 'LuxSellExitConfirmation_high' ||
                        h.name === 'LuxBuyExitConfirmation_high' ||
                        h.name === 'exchange' ||
                        h.name === 'gap_go_count' ||
                        h.name === 'gap_go_time'
                    )
                }).map((h) => {
                    if (h.name == "Ticker") return
                    if (h.name == "Price") return
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
