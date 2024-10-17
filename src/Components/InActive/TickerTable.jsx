import React, { useEffect, useState } from 'react'
// import TableHeader from './TableHeader'
// import TableBody from './TableBody'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';
import config from '../../../config.json'
import { FaChevronUp } from "react-icons/fa";


import { Table, TableHeader, TableColumn, TableRow, TableBody, TableCell, RadioGroup, Radio } from "@nextui-org/react";


export default function TickerTable({ setSelectedTicker, data, selectedTicker, setIdle, timer }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState(data.inactive.records)
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState(data.inactive.records)
    const [headers, setHeaders] = useState(data.inactive.headers)
    const [sorters, setSorters] = useState([])
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState('')
    const [newRecords, setnewRecords] = useState(false)
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

        if (field === 'halt_resume_time') {

            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.halt_resume_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateA - dateB;  // Ascending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.halt_resume_time) === -1)
                ]);
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.halt_resume_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateB - dateA;  // Descending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.halt_resume_time) === -1)
                ]);


            }

            return
        }

        if (field === 'momo_time') {

            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.momo_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateA - dateB;  // Ascending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.momo_time) === -1)
                ]);
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.momo_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateB - dateA;  // Descending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.momo_time) === -1)
                ]);


            }

            return
        }


        if (field === 'turbo_time') {

            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.turbo_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateA - dateB;  // Ascending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.turbo_time) === -1)
                ]);
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.turbo_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateB - dateA;  // Descending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.turbo_time) === -1)
                ]);


            }

            return
        }


        if (field === 'gap_go_time') {

            if (tempSorter[field] === Sorted.ASC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.gap_go_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateA - dateB;  // Ascending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.gap_go_time) === -1)
                ]);
            } else if (tempSorter[field] === Sorted.DEC) {
                setSearchedRecords(prev => [...prev
                    .filter(x => getTimeDifferenceInMinutes(x.gap_go_time) !== -1)
                    .sort((a, b) => {
                        const dateA = new Date(a[field]);
                        const dateB = new Date(b[field]);

                        return dateB - dateA;  // Descending order
                    }),
                ...prev.filter(x => getTimeDifferenceInMinutes(x.gap_go_time) === -1)
                ]);


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
        const sorters = {}
        data.inactive.headers.forEach((h) => {
            sorters[h.name] = Sorted.NO
        })
        setSorters(sorters)
        setRecords(data.inactive.records)
        setHeaders(data.inactive.headers)
        setSearchedRecords(data.inactive.records)

    }, [])


    useEffect(() => {
        setRecords(data.inactive.records)
        setHeaders([data.inactive.headers])
        setSearchedRecords(data.inactive.records.filter(x => x.ticker?.toLowerCase().includes(search.toLowerCase().trim())))
        // setnewRecords(true)

        const sortedField = Object.keys(sorters).filter((s) => sorters[s])[0]
        const header = headers.filter(h => h.name === sortedField)[0]
        // setnewRecords(false)
        sortedField && sort(sortedField, header.type, true)
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

            const sortedField = Object.keys(sorters).filter((s) => sorters[s])[0]
            const header = headers.filter(h => h.name === sortedField)[0]
            // setnewRecords(false)
            sortedField && sort(sortedField, header.type, true)

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

    async function activeTicker(ticker) {
        await fetch(config.API_URL + '/tickers/active/' + ticker, {
            method: "POST"
        })
        // const newRecords = records.filter(r => r.ticker !== ticker)
        // const newSearchedRecords = searchedRecords.filter(r => r.ticker !== ticker)
        // setRecords(newRecords)
        // setSearchedRecords(newSearchedRecords)

        setRecords(prev => prev.filter(r => r.ticker !== ticker))
        setSearchedRecords(prev => prev.filter(r => r.ticker !== ticker))
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
            <div className="flex justify-between items-center p-2 bg-[#1d4ed8] text-white rounded-t  h-[2.5rem]">
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
                        <TableBody searchedRecords={searchedRecords} header={headers} setSelectedTicker={setSelectedTicker} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords} />
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
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("ticker", "String")
                                    }}>
                                    <span className='pr-3'>Ticker</span>
                                    <FaChevronUp className={(sorters.ticker === 0) ? ' hidden' : (sorters.ticker === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("aiml_status", "Color")
                                    }}>
                                    <span className='pr-3'>AI/ML</span>
                                    <FaChevronUp className={(sorters.aiml_status === 0) ? ' hidden' : (sorters.aiml_status === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("price", "Number")
                                    }}>
                                    <span className='pr-3'>Price</span>
                                    <FaChevronUp className={(sorters.price === 0) ? ' hidden' : (sorters.price === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("float", "Number")
                                    }}>
                                    <span className='pr-3'>Float</span>
                                    <FaChevronUp className={(sorters.float === 0) ? ' hidden' : (sorters.float === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("volume_today", "Number")
                                    }}>
                                    <span className='pr-3'>Vol</span>
                                    <FaChevronUp className={(sorters.volume_today === 0) ? ' hidden' : (sorters.volume_today === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("relative_volume", "Number")
                                    }}>
                                    <span className='pr-3'>Rel Vol</span>
                                    <FaChevronUp className={(sorters.relative_volume === 0) ? ' hidden' : (sorters.relative_volume === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("change_from_the_Close", "Number")
                                    }}>
                                    <span className='pr-3'>&Delta; Close</span>
                                    <FaChevronUp className={(sorters.change_from_the_Close === 0) ? ' hidden' : (sorters.change_from_the_Close === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("change_from_the_Open", "Number")
                                    }}>
                                    <span className='pr-3'>&Delta; Open</span>
                                    <FaChevronUp className={(sorters.change_from_the_Open === 0) ? ' hidden' : (sorters.change_from_the_Open === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("today_range", "Number")
                                    }}>
                                    <span className='pr-3'>Today Range %</span>
                                    <FaChevronUp className={(sorters.today_range === 0) ? ' hidden' : (sorters.today_range === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>
                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className='flex text-base'
                                    onClick={() => {
                                        sort("sentiment_label", "Color")
                                    }}>
                                    <span className='pr-3'>News</span>
                                    <FaChevronUp className={(sorters.sentiment_label === 0) ? ' hidden' : (sorters.sentiment_label === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                </div>
                            </TableColumn>

                            <TableColumn className="text-white bg-[#238cf4]">
                                <div className=' flex items-center justify-center text-base'>
                                    Scanner Types (in Minutes)
                                </div>
                                <div className='w-full  border-t flex'>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r '>
                                        <div className='flex text-base'
                                            onClick={() => {
                                                sort("halt_resume_time", "Date")
                                            }}>
                                            <span className='pr-3'>H</span>
                                            <FaChevronUp className={(sorters.halt_resume_time === 0) ? ' hidden' : (sorters.halt_resume_time === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                        </div>
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r  '>
                                        <div className='flex text-base'
                                            onClick={() => {
                                                sort("momo_time", "Date")
                                            }}>
                                            <span className='pr-3'>M</span>
                                            <FaChevronUp className={(sorters.momo_time === 0) ? ' hidden' : (sorters.momo_time === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                        </div>
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center border-r  '>
                                        <div className='flex text-base'
                                            onClick={() => {
                                                sort("turbo_time", "Date")
                                            }}>
                                            <span className='pr-3'>T</span>
                                            <FaChevronUp className={(sorters.turbo_time === 0) ? ' hidden' : (sorters.turbo_time === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                        </div>
                                    </div>
                                    <div className='relative w-full h-full flex justify-center items-center text-center   '>
                                        <div className='flex text-base'
                                            onClick={() => {
                                                sort("gap_go_time", "Date")
                                            }}>
                                            <span className='pr-3'>G</span>
                                            <FaChevronUp className={(sorters.gap_go_time === 0) ? ' hidden' : (sorters.gap_go_time === 1 ? 'rotate-0 transition-all' : 'rotate-180 transition-all')} />
                                        </div>
                                    </div>
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
                                            <TableCell></TableCell>
                                            <TableCell>{record.price < 1 ? record.price?.toFixed(4) : record.price.toFixed(2)}</TableCell>
                                            <TableCell>{formatNumber(record.float)}</TableCell>
                                            <TableCell>{formatNumber(record.volume_today)}</TableCell>
                                            <TableCell>{record.relative_volume.toFixed(2)}</TableCell>
                                            <TableCell>{parseFloat(record.change_from_the_Close) ? parseFloat(record.change_from_the_Close).toFixed(2) : record.change_from_the_Close}</TableCell>
                                            <TableCell>{(parseFloat(record.change_from_the_Open) ? parseFloat(record.change_from_the_Open).toFixed(2) : "'" + parseFloat(record.change_from_the_Open).toFixed(2))}</TableCell>
                                            <TableCell>{Math.round(record.today_range)}</TableCell>
                                            <TableCell>
                                                <div className={'text-center rounded-lg' + ((record.sentiment_label === "Bullish" || record.sentiment_label === "Somewhat-Bullish") ? ' bg-green-500' : '') + ((record.sentiment_label === "Bearish" || record.sentiment_label === "Somewhat-Bearish") ? ' bg-red-400' : '')}>
                                                    {record.Sentiment_Change ? "U" : ""}
                                                </div>
                                            </TableCell>
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
                                    activeTicker(contextRow.ticker)
                                }}>Activate</li>
                                <li className='hover:bg-slate-200 w-full px-2 cursor-pointer' onClick={() => {
                                    setSelectedTicker(contextRow)
                                }}>View Details</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
