import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
export default function TableRow({ setContextRow, setClicked, setPoints, record, i, selectedTicker, header, setSelectedTicker, setRecords, setSearchedRecords, records, searchedRecords, setIdle, timer }) {

    const [H, setH] = useState(getTimeDifferenceInMinutes(record.halt_resume_time))
    const [M, setM] = useState(getTimeDifferenceInMinutes(record.momo_time))
    const [T, setT] = useState(getTimeDifferenceInMinutes(record.turbo_time))
    const [G, setG] = useState(getTimeDifferenceInMinutes(record.gap_go_time))

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
        setH(getTimeDifferenceInMinutes(record.halt_resume_time))
        setM(getTimeDifferenceInMinutes(record.momo_time))
        setT(getTimeDifferenceInMinutes(record.turbo_time))
        setG(getTimeDifferenceInMinutes(record.gap_go_time))
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
            return -1;
        }

        const now = new Date();
        const diffInMilliseconds = now - inputDate;
        const diffInMinutes = Math.floor(diffInMilliseconds / 60000);

        return diffInMinutes;
    }

    return (
        <tr onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setClicked(true);
            setContextRow(record)
            setPoints({
                x: e.pageX,
                y: e.pageY,
            });
            // console.log("Right Click", e.pageX, e.pageY);
        }}
            className={"w-full flex h-[3rem] relative cursor-pointer font-semibold text-sm border-b border-black " + ((selectedTicker?.ticker === record.ticker) ? ' bg-white' : 'bg-blue-200 ')} onClick={(e) => { window.clearTimeout(timer);e.stopPropagation() ;setIdle(false); setSelectedTicker(record); console.log(e.target) }}>

            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-l border-blue-700'>
                {record.ticker}
            </td>
            <td className={'w-[5%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + (record.aiml_status && " bg-green-500")}>
                

            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {record.price < 1 ? record.price?.toFixed(4) : record.price.toFixed(2)}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {formatNumber(record.float)}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {formatNumber(record.volume_today)}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {record.relative_volume.toFixed(2)}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {/* {parseFloat(record.change_from_the_Close) ? parseFloat(record.change_from_the_Close).toFixed(2) : parseFloat(record.change_from_the_Close.slice(1)).toFixed(2)} */}
                {parseFloat(record.change_from_the_Close) ? parseFloat(record.change_from_the_Close).toFixed(2) : record.change_from_the_Close}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {parseFloat(record.change_from_the_Open) ? parseFloat(record.change_from_the_Open).toFixed(2) : record.change_from_the_Open}
            </td>
            <td className='w-[10%] h-full flex justify-center items-center text-center truncate border-r border-blue-700'>
                {Math.round(record.today_range)}
            </td>


            <td className={'w-[5%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((record.sentiment_label === "Bullish" || record.sentiment_label === "Somewhat-Bullish") ? ' bg-green-500' : '') + ((record.sentiment_label === "Bearish" || record.sentiment_label === "Somewhat-Bearish") ? ' bg-red-400' : '')}>
                {record.Sentiment_Change ? "U" : ""}

            </td>

            <td className='w-[20%] flex justify-center items-center text-center truncate border-r border-blue-700'>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((record.halt_resume_count === 0 && H <= 2 && H > 0) ? ' bg-green-400' : '') + ((record.halt_resume_count !== 0 && record.halt_resume_count % 2 === 0) ? ' bg-red-500' : '') + ((record.halt_resume_count % 2 !== 0) ? ' bg-green-400' : '')}>
                    {H !== -1 ? H : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((M <= 2 && M !== -1) ? ' bg-green-400' : '')}>
                    {M !== -1 ? M : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate border-r border-blue-700 ' + ((T <= 2 && T !== -1) ? ' bg-green-400' : '')}>
                    {T !== -1 ? T : '--'}
                </td>
                <td className={'w-[25%] h-full flex justify-center items-center text-center truncate ' + ((G <= 2 && G !== -1) ? ' bg-green-400' : '')}>
                    {G !== -1 ? G : '--'}
                </td>
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
