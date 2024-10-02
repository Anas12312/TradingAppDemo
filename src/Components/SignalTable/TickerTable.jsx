import React, { useEffect, useState } from 'react'
// import TableHeader from './TableHeader'
// import TableBody from './TableBody'
import config from '../../../config.json'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';

import { Table, TableHeader, TableColumn, TableRow, TableBody, TableCell, RadioGroup, Radio } from "@nextui-org/react";



export default function TickerTable({ setSelectedTicker, data, selectedTicker, setIdle, timer }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState(data.signal.records)
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState(data.signal.records)
    const [headers, setHeaders] = useState(data.signal.headers)
    const [sorters, setSorters] = useState([])
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState('')
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
        }
        setSorted(!sorted)

    }

    useEffect(() => {
        const sorters = {}
        data.signal.headers.forEach((h) => {
            sorters[h.name] = Sorted.NO
        })
        setSorters(sorters)
    }, [])

    useEffect(() => {
        console.log("anas")
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
    async function intradeTicker(ticker) {
        await fetch(config.API_URL + '/tickers/intrade/' + ticker, {
            method: "POST"
        })
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
            <div className="flex justify-between items-center p-2 bg-blue-700 text-white rounded-t  h-[2.5rem]">
                {/* Left side text */}
                <div className=' flex w-full space-x-10'>
                    <div className="font-semibold text-lg select-none">
                        Tickers Table
                    </div>
                    {/* Search & Info */}
                    <div className='w-[19.3%] flex justify-start items-center'>
                        <input className='focus:outline-0 text-left font-semibold text-black font-Sansation-Light text-base w-full pt-0.5 pl-2 items-center border-white rounded ' value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder='Search Ticker'
                        />
                    </div>
                </div>
                {/* Right side icons */}
                <div className="flex space-x-3 drag-handle">
                    <FaArrowsAlt className="cursor-move hover:text-gray-400" />
                </div>
            </div>
            <div className='bg-white flex justify-center items-start w-full h-full'>
                <div className='flex-col justify-center items-center w-full h-full'>
                    {/* Table Header */}
                    {/* <div className='w-full border-collapse h-[90%]'>
                        <TableHeader sort={sort} header={headers} sorters={sorters} />
                        <TableBody timer={timer} setIdle={setIdle} searchedRecords={searchedRecords} header={headers} setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords}/>
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
                        className='h-[90%]'
                        selectedKeys={[selectedTicker?.ticker]}
                        aria-label="Example static collection table"
                        radius='none'
                    >
                        <TableHeader onKeyDown={(e) => {
                            const { key } = e;
                            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
                                e.stopPropagation(); // Prevent the event from bubbling up to the table
                                // Optionally, you can prevent default behavior to stop scrolling, if any
                                e.preventDefault();
                            }
                        }}>
                            <TableColumn>Ticker</TableColumn>
                            <TableColumn>Time</TableColumn>
                            <TableColumn>Stop Loss %</TableColumn>
                            <TableColumn>Vol</TableColumn>

                            <TableColumn>
                                <div className=' flex items-center justify-center'>
                                    Scanner Types (in Minutes)
                                </div>
                                <div className='w-full  border-t flex'>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r '>
                                        H
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r  '>
                                        M
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r  '>
                                        T
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center   '>
                                        G
                                    </div>
                                </div>
                            </TableColumn>

                            <TableColumn>Type</TableColumn>
                        </TableHeader>
                        <TableBody >
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            {
                                searchedRecords?.map((record, i) => {

                                    const H = getTimeDifferenceInMinutes(record.halt_resume_time)
                                    const M = getTimeDifferenceInMinutes(record.momo_time)
                                    const T = getTimeDifferenceInMinutes(record.turbo_time)
                                    const G = getTimeDifferenceInMinutes(record.gap_go_time)

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
                                            <TableCell>{record.signal_time}</TableCell>
                                            <TableCell>{record.stop_loss.toFixed(2)}</TableCell>
                                            <TableCell>{formatNumber(record.volume_today || 5)}</TableCell>

                                            <TableCell>
                                                <div className='w-full flex'>
                                                    <div className={'rounded-lg relative w-full h-full flex justify-center items-center text-center  ' + ((record.halt_resume_count === 0 && H <= 2 && H > 0) ? ' bg-green-400' : '') + ((record.halt_resume_count !== 0 && record.halt_resume_count % 2 === 0) ? ' bg-red-500' : '') + ((record.halt_resume_count % 2 !== 0) ? ' bg-green-400' : '')}>
                                                        {H !== -1 ? H : '--'}
                                                    </div>
                                                    <div className={'rounded-lg relative w-full h-full flex justify-center items-center text-center  ' + ((M <= 2 && M !== -1) ? ' bg-green-400' : '')}>
                                                        {M !== -1 ? M : '--'}
                                                    </div>
                                                    <div className={'rounded-lg relative w-full h-full flex justify-center items-center text-center  ' + ((T <= 2 && T !== -1) ? ' bg-green-400' : '')}>
                                                        {T !== -1 ? T : '--'}
                                                    </div>
                                                    <div className={'rounded-lg relative w-full h-full flex justify-center items-center text-center  ' + ((G <= 2 && G !== -1) ? ' bg-green-400' : '')}>
                                                        {G !== -1 ? G : '--'}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <span className='pl-2'>{record.Signal_type.map(x => x.S).join(',')}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    {clicked && (
                        <div style={{ top: points.y - 125, left: points.x - 210 }} className='absolute bg border border-black bg-white w-40 py-1'>
                            <ul className='flex flex-col'>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    intradeTicker(contextRow.ticker)
                                }}>Intrade</li>
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
