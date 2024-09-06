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
        <div className='border-b border-slate-500 select-none w-full bg-[#ECECEC] h-[20%] flex items-center justify-start text-[1rem] shadow font-Sansation-Bold border-t'>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("ticker", "String")
                }}>
                Ticker
                <img src={(sorters.ticker === 0) ? SORT : (sorters.ticker === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("price", "Number")
                }}>
                Price
                <img src={(sorters.price === 0) ? SORT : (sorters.price === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("float", "Number")
                }}>
                Float
                <img src={(sorters.float === 0) ? SORT : (sorters.float === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("volume_today", "Number")
                }}>
                Vol
                <img src={(sorters.volume_today === 0) ? SORT : (sorters.volume_today === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("relative_volume", "Number")
                }}>
                Rel Vol
                <img src={(sorters.relative_volume === 0) ? SORT : (sorters.relative_volume === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("change_from_the_Close", "Number")
                }}>
                &Delta; Close
                <img src={(sorters.change_from_the_Close === 0) ? SORT : (sorters.change_from_the_Close === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("change_from_the_Open", "Number")
                }}>
                &Delta; Open
                <img src={(sorters.change_from_the_Open === 0) ? SORT : (sorters.change_from_the_Open === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("today_range", "Number")
                }}>
                Today Range %
                <img src={(sorters.today_range === 0) ? SORT : (sorters.today_range === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>

            <div className='relative w-[5%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                S
            </div>

            <div className='relative w-[20%] h-full flex flex-col items-center '>
                <div className='h-full'>
                    Scanner Types
                </div>
                <div className='w-full h-full border-t border-slate-500 flex'>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("halt_resume_time", "Date")
                        }}>
                        H
                        <img src={(sorters.halt_resume_time === 0) ? SORT : (sorters.halt_resume_time === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("momo_time", "Date")
                        }}>
                        M
                        <img src={(sorters.momo_time === 0) ? SORT : (sorters.momo_time === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("turbo_time", "Date")
                        }}>
                        T
                        <img src={(sorters.turbo_time === 0) ? SORT : (sorters.turbo_time === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center  text-base'
                        onClick={() => {
                            sort("gap_go_time", "Date")
                        }}>
                        G
                        <img src={(sorters.gap_go_time === 0) ? SORT : (sorters.gap_go_time === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                </div>
            </div>

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
                }).map((h, index) => {
                    if (h.name == "Ticker") return
                    if (h.name == "Price") return
                    return (
                        <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-slate-500 text-sm'
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
            } */}
        </div>
    )
}
