import React, { useEffect, useState } from 'react'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';
import config from '../../../config.json'
import InTradeTableHeader from './InTradeTableHeader';
import InTradeTableBody from './InTradeTableBody';

import { Table, TableHeader, TableColumn, TableRow, TableBody, TableCell, RadioGroup, Radio } from "@nextui-org/react";


export default function InTradeTickerTable({ setSelectedTicker, data, selectedTicker, setIdle, timer }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState(data.intrade.records)
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState(data.intrade.records)
    const [headers, setHeaders] = useState(data.intrade.headers)
    const [sorters, setSorters] = useState([])
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState('')
    const [newRecords, setnewRecords] = useState(false)
    async function refresh() {
        setReload(!reload)
    }
    const sort = (field, type) => {
        const tempSorter = { ...sorters }

        const keys = Object.keys(sorters).filter(x => x !== field)
        for (const key of keys) {
            tempSorter[key] = Sorted.NO
        }

        if (tempSorter[field] === Sorted.NO) tempSorter[field] = Sorted.ASC
        else tempSorter[field] = (tempSorter[field] * -1)

        setSorters(tempSorter)

        if (type == "Number") {
            if (tempSorter[field] === Sorted.ASC) setRecords(records.sort((a, b) => +a[field] - +b[field]))
            else if (tempSorter[field] === Sorted.DEC) setRecords(records.sort((a, b) => +b[field] - +a[field]))

            setRecords(records)
        } else if (type == "String") {
            if (tempSorter[field] === Sorted.ASC) {
                setRecords(records.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return -1;
                    }
                    if (a[field] > b[field]) {
                        return 1;
                    }
                    return 0;
                }))
            } else if (tempSorter[field] === Sorted.DEC) {
                setRecords(records.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return 1;
                    }
                    if (a[field] > b[field]) {
                        return -1;
                    }
                    return 0;
                }))
            }
        } else if (type == "Date") {
            console.log(field);
            if (tempSorter[field] === Sorted.ASC) {
                setRecords(records.sort((a, b) => {
                    const dateA = new Date(a[field]);
                    const dateB = new Date(b[field]);

                    return dateA - dateB;  // Ascending order
                }));
            } else if (tempSorter[field] === Sorted.DEC) {
                setRecords(records.sort((a, b) => {
                    const dateA = new Date(a[field]);
                    const dateB = new Date(b[field]);

                    return dateB - dateA;  // Descending order
                }));
            }
        }

    }

    useEffect(() => {
        const sorters = {}
        data.intrade.headers.forEach((h) => {
            sorters[h.name] = Sorted.NO
        })
        setSorters(sorters)
        setRecords(data.intrade.records)
        setHeaders(data.intrade.headers)
        setSearchedRecords(data.intrade.records)

    }, [])

    useEffect(() => {
        setRecords(data.intrade.records)
        setHeaders(data.intrade.headers)
        setSearchedRecords(data.intrade.records)
        setnewRecords(true)
    }, [data])

    useEffect(() => {
        const sortedField = Object.keys(sorters).filter((s) => sorters[s])[0]
        const header = headers.filter(h => h.name === sortedField)[0]
        setnewRecords(false)
        sortedField && sort(sortedField, header.type)
    }, [newRecords])

    useEffect(() => {
        if (search === "") {
            setSearchedRecords(records)
        } else {
            setSearchedRecords(records.filter(x => x.ticker?.toLowerCase().includes(search.toLowerCase().trim())))
        }
        return () => {
            // console.log(searchedRecords);
        }
    }, [search, sorted])




    // CONTEXT MENU
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

    // ROW
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
        <>
            <div className='bg-white flex justify-center items-start w-full h-full pt-'>
                <div className='flex-col justify-center items-center w-full h-full'>

                    {/* Table Header */}
                    {/* <div className='w-full border-collapse h-[100%]'>
                        <InTradeTableHeader sort={sort} header={headers} sorters={sorters} />
                        <InTradeTableBody searchedRecords={searchedRecords} header={headers} setSelectedTicker={setSelectedTicker} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords} />
                    </div> */}

                    <Table
                        id='Table-Scan'
                        onKeyDown={(e) => {
                            const { key } = e;
                            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
                                e.stopPropagation(); // Prevent the event from bubbling up to the table
                                // Optionally, you can prevent default behavior to stop scrolling, if any
                                e.preventDefault();
                            }
                        }}
                        isHeaderSticky
                        color={'primary'}
                        selectionMode="single"
                        className='h-[100%]'
                        selectedKeys={[selectedTicker?.ticker]}
                        aria-label="Example static collection table"
                        radius='none'
                    >
                        <TableHeader
                         onKeyDown={(e) => {
                            const { key } = e;
                            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
                                e.stopPropagation(); // Prevent the event from bubbling up to the table
                                // Optionally, you can prevent default behavior to stop scrolling, if any
                                e.preventDefault();
                            }
                        }}>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Ticker</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Price</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Price Angle</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Float</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Vol</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Rel Vol</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>EMA10 Bullish</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>EMA10 raising</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>VWAP Raising</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Smooth HA</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Trend Catcher</div></TableColumn>
                            <TableColumn className='bg-[#1d4ed8] text-white text-xs'><div className='w-6 text-wrap'>Trend Tracer</div></TableColumn>
                        </TableHeader>
                        <TableBody >
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            {
                                searchedRecords?.map((record, i) => {
                                    if (i % 2) return
                                    return (
                                        <TableRow
                                            className='focus:outline-none focus:ring-0'
                                            onKeyDown={(e) => {
                                                const { key } = e;
                                                if (key === 'ArrowLeft' || key === 'ArrowRight') {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                }
                                                if (key === 'ArrowDown') {
                                                    // e.stopPropagation(); // Prevent the event from bubbling up to the table
                                                    // Optionally, you can prevent default behavior to stop scrolling, if any
                                                    // e.preventDefault();

                                                    if (searchedRecords[i + 1]) {
                                                        setSelectedTicker(searchedRecords[i + 1])
                                                    }
                                                    setIdle(false)
                                                }

                                                if (key === 'ArrowUp') {
                                                    if (searchedRecords[i - 1]) {
                                                        setSelectedTicker(searchedRecords[i - 1])
                                                    }
                                                    setIdle(false)
                                                }
                                            }}
                                            key={record.ticker}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setClicked(true);
                                                setContextRow(record)
                                                setPoints({
                                                    x: e.pageX,
                                                    y: e.pageY,
                                                });
                                            }}

                                            onClick={(e) => {
                                                window.clearTimeout(timer);
                                                setClicked(false)
                                                setIdle(false);
                                                e.stopPropagation();
                                                setSelectedTicker(record);
                                                console.log(e.target);
                                            }}


                                        >
                                            <TableCell className='font-semibold focus:outline-none'>{record.ticker}</TableCell>
                                            <TableCell className=''>{record.price < 1 ? record.price?.toFixed(4) : record.price?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{record.price_angle?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{formatNumber(record.float)}</TableCell>
                                            <TableCell className=''>{formatNumber(record.volume_today)}</TableCell>
                                            <TableCell className=''>{record.relative_volume?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{record.ema10_bullish?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{record.ema10_raising?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{record.vwap_raising?.toFixed(2)}</TableCell>
                                            <TableCell className=''>{record.smooth_ha?.toFixed(2)}</TableCell>
                                            <TableCell className='text-center'>{record.trendcatcher_status.toString().replace("'", "")}</TableCell>
                                            <TableCell className='text-center'>{record.trendtracer_status.toString().replace("'", "")}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    {clicked && (
                        <div style={{ top: points.y - 210, left: points.x - 210 }} className='absolute bg border border-black bg-white w-40 py-1'>
                            <ul className='flex flex-col'>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    detradeTicker(contextRow.ticker)
                                }}>Detrade</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    window.clearTimeout(timer);
                                    setClicked(false)
                                    setIdle(false);
                                    setSelectedTicker(contextRow);
                                }}>View Details</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
