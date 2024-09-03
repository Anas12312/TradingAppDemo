import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
export default function TableRow({ setContextRow, setClicked, setPoints, record, i, header, setSelectedTicker, setRecords, setSearchedRecords, records, searchedRecords }) {

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
    }, [record])

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

            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.ticker}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.price < 1 ? record.price?.toFixed(4) : record.price.toFixed(2)} 
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.float}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.volume_today}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.relative_volume}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.change_from_the_Close}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.change_from_the_Open}
            </td>
            <td className='w-[14%] h-full flex justify-center items-center text-center truncate'>
                {record.today_range}
            </td>

            {/* {
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
            } */}

        </tr>
    )
}
