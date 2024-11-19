import React, { useEffect, useState } from 'react'
import config from '../../../config.json'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';
import { FaChevronUp } from "react-icons/fa";


import { Table, TableHeader, TableColumn, TableRow, TableBody, TableCell, RadioGroup, Radio } from "@nextui-org/react";




export default function AlarmsTable({ data }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState(data.alarms.records.sort((a, b) => {
        const dateA = new Date(`1970-01-01T${a.time}Z`);
        const dateB = new Date(`1970-01-01T${b.time}Z`);
        return dateB - dateA;
      }))
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState(data.alarms.records.sort((a, b) => {
        const dateA = new Date(`1970-01-01T${a.time}Z`);
        const dateB = new Date(`1970-01-01T${b.time}Z`);
        return dateB - dateA;
      }))
    const [headers, setHeaders] = useState(data.alarms.headers)
    const [sorters, setSorters] = useState([])
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState('')
    async function refresh() {
        setReload(!reload)
    }
    const sort = (field, type, order) => {
        const tempSorter = { ...sorters }

        const keys = Object.keys(sorters).filter(x => x !== field)
        for (const key of keys) {
            tempSorter[key] = Sorted.NO
        }

        if (tempSorter[field] === Sorted.NO) tempSorter[field] = Sorted.ASC
        else {
            if (!order) tempSorter[field] = (tempSorter[field] * -1)
        }

        setSorters(tempSorter)

        if (field === 'oa') {
            if (tempSorter[field] === Sorted.DEC) setSearchedRecords(prev => {
                const temp = prev.map((record, i) => {
                    let OA_Value = i
                    if (record.trendcatcher_status > 0) OA_Value++
                    if (record.trendtracer_status > 0) OA_Value++
                    if (record.smooth_ha > 0) OA_Value++
                    if (record.ema10_bullish > 0) OA_Value++
                    if (record.ema10_raising > 0) OA_Value++
                    if (record.vwap_raising > 0) OA_Value++

                    return {
                        ...record,
                        oa: OA_Value
                    }
                })


                return temp.sort((a, b) => b.oa - a.oa)
            })

            if (tempSorter[field] === Sorted.ASC) setSearchedRecords(prev => {
                const temp = prev.map((record, i) => {
                    let OA_Value = i
                    if (record.trendcatcher_status > 0) OA_Value++
                    if (record.trendtracer_status > 0) OA_Value++
                    if (record.smooth_ha > 0) OA_Value++
                    if (record.ema10_bullish > 0) OA_Value++
                    if (record.ema10_raising > 0) OA_Value++
                    if (record.vwap_raising > 0) OA_Value++

                    return {
                        ...record,
                        oa: OA_Value
                    }
                })

                return temp.sort((a, b) => a.oa - b.oa)
            })

            return
        }

        if (field === 'aiml_status') {
            if (tempSorter[field] === Sorted.DEC) setSearchedRecords(prev => prev.sort((x, y) => {
                return (x.aiml_status === y.aiml_status) ? 0 : x.aiml_status ? -1 : 1;
            }))

            if (tempSorter[field] === Sorted.ASC) setSearchedRecords(prev => prev.sort((x, y) => {
                return (x.aiml_status === y.aiml_status) ? 0 : x.aiml_status ? 1 : -1;
            }))

            return
        }

        if (field === 'sentiment_label') {
            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => [
                    ...prev.filter(x => (x.sentiment_label === "Bullish" || x.sentiment_label === "Somewhat-Bullish")),
                    ...prev.filter(x => (x.sentiment_label === "Bearish" || x.sentiment_label === "Somewhat-Bearish")),
                    ...prev.filter(x => !x.sentiment_label)
                ])
            }

            if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => [
                    ...prev.filter(x => (x.sentiment_label === "Bearish" || x.sentiment_label === "Somewhat-Bearish")),
                    ...prev.filter(x => (x.sentiment_label === "Bullish" || x.sentiment_label === "Somewhat-Bullish")),
                    ...prev.filter(x => !x.sentiment_label)
                ])
            }
            return
        }

        


        if (type == "Number") {
            console.log('Num', field, tempSorter[field]);
            if (tempSorter[field] === Sorted.ASC) {
                console.log('Sort');
                setSearchedRecords(prev => prev.sort((a, b) => +a[field] - +b[field]))
            }
            else if (tempSorter[field] === Sorted.DEC) setSearchedRecords(prev => prev.sort((a, b) => +b[field] - +a[field]))

            // setSearchedRecords(records)
        } else if (type == "String") {
            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => prev.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return -1;
                    }
                    if (a[field] > b[field]) {
                        return 1;
                    }
                    return 0;
                }))
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => prev.sort((a, b) => {
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
                setSearchedRecords(prev => prev.sort((a, b) => {
                    const dateA = new Date(a[field]);
                    const dateB = new Date(b[field]);

                    return dateA - dateB;  // Ascending order
                }));
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => prev.sort((a, b) => {
                    const dateA = new Date(a[field]);
                    const dateB = new Date(b[field]);

                    return dateB - dateA;  // Descending order
                }));
            }
        }

    }

    useEffect(() => {
        if (search === "") {
            setSearchedRecords(records)
        } else {
            setSearchedRecords(prev => prev.filter(x => x.error?.toLowerCase().includes(search.toLowerCase().trim())))
            const sortedField = Object.keys(sorters).filter((s) => sorters[s])[0]
            const header = headers.filter(h => h.name === sortedField)[0]
            sortedField && sort(sortedField, header.type, true)
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
        const sorters = {}
        data.signal.headers.forEach((h) => {
            sorters[h.name] = Sorted.NO
        })
        setSorters({
            ...sorters,
            volume_today: Sorted.NO,
            gap_go_time: Sorted.NO,
            halt_resume_time: Sorted.NO,
            momo_time: Sorted.NO,
            turbo_time: Sorted.NO,
        })

        setRecords(data.alarms.records.sort((a, b) => {
            const dateA = new Date(`1970-01-01T${a.time}Z`);
            const dateB = new Date(`1970-01-01T${b.time}Z`);
            return dateB - dateA;
          }))
        setHeaders(data.alarms.headers)
        setSearchedRecords(data.alarms.records.filter(x => x.time?.toLowerCase().includes(search.toLowerCase().trim())).sort((a, b) => {
            const dateA = new Date(`1970-01-01T${a.time}Z`);
            const dateB = new Date(`1970-01-01T${b.time}Z`);
            return dateB - dateA;
          }))
        // setnewRecords(true)

        const sortedField = Object.keys(sorters).filter((s) => sorters[s])[0]
        const header = headers.filter(h => h.name === sortedField)[0]
        // setnewRecords(false)
        sortedField && sort(sortedField, header.type, true)


        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    async function AckAlarm(time) {
        await fetch(config.API_URL + '/tickers/ack/' + time, {
            method: "POST"
        })
        const copy = searchedRecords
        setSearchedRecords([])
        setSearchedRecords(copy)
    }
    async function DeleteAlarm(time) {
        await fetch(config.API_URL + '/tickers/delete-alarm/' + time, {
            method: "DELETE"
        })
        setRecords(prev => prev.filter(r => r.time !== time))
        setSearchedRecords(prev => prev.filter(r => r.time !== time))
    }


    return (
        <>
            <div className="flex justify-between items-center p-2 bg-[#1d4ed8] text-white rounded-t  h-[2.5rem]">
                {/* Left side text */}
                <div className=' flex w-full space-x-10'>
                    <div className="font-semibold text-lg select-none">
                        Alarms Table
                    </div>
                    {/* Search & Info */}
                    <div className='w-[19.3%] flex justify-start items-center'>
                        <input className='focus:outline-0 text-left font-semibold text-black font-Sansation-Light text-base w-full pt-0.5 pl-2 items-center border-white rounded ' value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder='Search Alarm'
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



                    <Table
                        id='Table-Alarms'
                        isHeaderSticky
                        color={'primary'}
                        className='h-[90%]'
                        aria-label="Example static collection table"
                        radius='none'
                    >
                        <TableHeader>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Time</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Severity</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Main Function</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Sub Function</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Ticker</span>
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'>
                                    <span className='pr-3'>Error</span>
                                </div>
                            </TableColumn>


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

                                    return (
                                        <TableRow
                                            className={'focus:outline-none focus:ring-0 ' + (record.cleared && "bg-slate-300")}
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
                                        >
                                            <TableCell>{record.time || "None"}</TableCell>
                                            <TableCell>
                                                { record.severity == 1 && <div className='ml-6 bg-yellow-400 w-5 h-5 rounded-full'></div> }
                                                { record.severity == 2 && <div className='ml-6 bg-orange-500 w-5 h-5 rounded-full'></div> }
                                                { record.severity == 3 && <div className='ml-6 bg-red-600 w-5 h-5 rounded-full'></div> }
                                            </TableCell>
                                            <TableCell>{record.main_function}</TableCell>
                                            <TableCell>{record.sub_function}</TableCell>
                                            <TableCell>{record.ticker}</TableCell>
                                            <TableCell>{record.error}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                    {clicked && (
                        <div style={{ top: points.y - 115, left: points.x - 10 }} className='absolute bg border border-black bg-white w-40 py-1'>
                            <ul className='flex flex-col'>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    setClicked(false)
                                    AckAlarm(contextRow.time)
                                }}>Acknowledge</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    DeleteAlarm(contextRow.time)
                                    setClicked(false)
                                }}>Delete</li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
