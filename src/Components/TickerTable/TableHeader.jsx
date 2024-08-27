import React, { useEffect } from 'react'
import SORT from '../../../images/sort.png'
import SORT_UP from '../../../images/sort-up.png'
import SORT_DOWN from '../../../images/sort-down.png'
export default function TableHeader({ sort, header, sorters }) {
    useEffect(() => {
        // console.log(sorters)
        // console.log(header)
    }, [header])
    return (
        <div className='border-b border-slate-500 select-none w-full bg-[#ECECEC] h-[15%] flex items-center justify-start text-[1rem] shadow font-Sansation-Bold border-t'>
            <div className='relative w-[3%] h-full flex justify-center items-center text-center border-l border-slate-500 text-base'>
                no.
            </div>
            <div className='relative w-[7%] h-full flex justify-center items-center text-center border-x border-slate-500 text-base'>
                Check
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("Ticker", "String")
                }}>
                Ticker
                <img src={(sorters.Ticker === 0) ? SORT : (sorters.Ticker === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("Price", "Number")
                }}>
                Price
                <img src={(sorters.Price === 0) ? SORT : (sorters.Price === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            {
                header.map((h, index) => {
                    if(h.name == "Ticker") return
                    if(h.name == "Price") return
                    return (
                        <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                            onClick={() => {
                                sort(h.name, h.type)
                            }}>
                            {h.name}
                            <img src={(sorters[h.name] === 0) ? SORT : (sorters[h.name] === 1 ? SORT_UP : SORT_DOWN)}
                                className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}
