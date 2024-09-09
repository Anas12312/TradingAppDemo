import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import config from '../../../config.json'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';


export default function TickerTable({ setSelectedTicker, data }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState(data.signalLogs.records)
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState(data.signalLogs.records)
    const [headers, setHeaders] = useState(data.signalLogs.headers)
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
        data.signalLogs.headers.forEach((h) => {
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
                    <div className='w-full border-collapse h-[90%]'>
                        <TableHeader sort={sort} header={headers} sorters={sorters} />
                        <TableBody searchedRecords={searchedRecords} header={headers} setSelectedTicker={setSelectedTicker} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords} />
                    </div>

                </div>
            </div>
        </>
    )
}
