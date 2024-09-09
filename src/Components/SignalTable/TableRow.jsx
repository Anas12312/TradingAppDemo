import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
export default function TableRow({ setContextRow, setClicked, setPoints, record, i, header, setSelectedTicker, setRecords, setSearchedRecords, records, searchedRecords }) {

    const [H, setH] = useState(getTimeDifferenceInMinutes(record.halt_resume_time))
    const [M, setM] = useState(getTimeDifferenceInMinutes(record.momo_time))
    const [T, setT] = useState(getTimeDifferenceInMinutes(record.turbo_time))
    const [G, setG] = useState(getTimeDifferenceInMinutes(record.gap_go_time))

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
        setH(record.Halt_Diff)
        setM(record.MOMO_diff)
        setT(record.Turbo_diff)
        setG(record.GAP_diff)
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

    function formatNumber(num) {
        if (num >= 1e6) {
            return Math.round(num / 1e6) + 'M';
        } else if (num >= 1e3) {
            return Math.round(num / 1e3) + 'k';
        } else {
            return num.toString();
        }
    }

    function getTimeDifferenceInMinutes(inputDateTime) {
        const ignoreDateTime = new Date('2024-01-01T04:00:00');
        const inputDate = new Date(inputDateTime);

        // Check if the input date matches the ignore date
        if (inputDate.getTime() === ignoreDateTime.getTime()) {
            return null;
        }

        const now = new Date();
        const diffInMilliseconds = now - inputDate;
        const diffInMinutes = Math.floor(diffInMilliseconds / 60000);

        return diffInMinutes;
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
            className="w-full flex h-[3rem] relative cursor-pointer" onClick={(e) => { setSelectedTicker(record.ticker); console.log(e.target) }}>

            <td className='w-[12.675%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {record.ticker}
            </td>
            <td className='w-[12.675%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {record.signal_time}
            </td>
            <td className='w-[12.75%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {record.stop_loss.toFixed(2)}
            </td>
            <td className='w-[12.78%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {formatNumber(record.volume_today || 5)}
            </td>
        
            <td className='w-[36.45%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((record.Halt_Count === 0 && H <= 2 && H > 0 ) ? ' bg-green-400' : '' ) + ((record.Halt_Count !== 0 && record.Halt_Count % 2 === 0 ) ? ' bg-red-500' : '' )  + (( record.Halt_Count % 2 !== 0 ) ? ' bg-green-400' : '' ) }>
                    {H !== null ? H + ' min' : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((M <= 2 && M !== null) ? ' bg-green-400' : '' )  }>
                    {M !== null ? M + ' min' : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((T <= 2 && T !== null) ? ' bg-green-400' : '' )  }>
                    {T !== null ? T + ' min' : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate ' + ((G <= 2 && G !== null) ? ' bg-green-400' : '' )  }>
                    {G !== null ? G + ' min' : '--'}
                </td>
            </td>
            <td className='w-[12.675%] h-full flex justify-start items-center text-center truncate text-sm'>
                <span className='pl-2'>{record.Signal_type.map(x => x.S).join(',')}</span>
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
                        <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                            {record[h.name]}
                        </td>
                    )
                })
            } */}

        </tr>
    )
}
