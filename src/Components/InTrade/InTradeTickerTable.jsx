import React, { useEffect, useState } from 'react'
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';
import config from '../../../config.json'
import InTradeTableHeader from './InTradeTableHeader';
import InTradeTableBody from './InTradeTableBody';
export default function InTradeTickerTable({ setSelectedTicker, data }) {
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

    return (
        <>
            <div className='bg-white flex justify-center items-start w-full h-full pt-'>
                <div className='flex-col justify-center items-center w-full h-full'>

                    {/* Table Header */}
                    <div className='w-full border-collapse h-[100%]'>
                        <InTradeTableHeader sort={sort} header={headers} sorters={sorters} />
                        <InTradeTableBody searchedRecords={searchedRecords} header={headers} setSelectedTicker={setSelectedTicker} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords} />
                    </div>

                </div>
            </div>
        </>
    )
}
