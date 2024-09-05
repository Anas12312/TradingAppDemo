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
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("ticker", "String")
                }}>
                Ticker
                <img src={(sorters.ticker === 0) ? SORT : (sorters.ticker === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("signal_time", "Date")
                }}>
                Time
                <img src={(sorters.signal_time === 0) ? SORT : (sorters.signal_time === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("stop_loss", "Number")
                }}>
                Stop Loss %
                <img src={(sorters.stop_loss === 0) ? SORT : (sorters.stop_loss === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("volume_today", "Number")
                }}>
                Vol
                <img src={(sorters.volume_today === 0) ? SORT : (sorters.volume_today === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[39.9%] h-full flex flex-col items-center border-r border-slate-500'>
                <div className='h-full'>
                    Scanner Types
                </div>
                <div className='w-full h-full border-t border-slate-500 flex'>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("Halt_Diff", "Number")
                        }}>
                        H
                        <img src={(sorters.Halt_Diff === 0) ? SORT : (sorters.Halt_Diff === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("MOMO_diff", "Number")
                        }}>
                        M
                        <img src={(sorters.MOMO_diff === 0) ? SORT : (sorters.MOMO_diff === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                        onClick={() => {
                            sort("Turbo_diff", "Number")
                        }}>
                        T
                        <img src={(sorters.Turbo_diff === 0) ? SORT : (sorters.Turbo_diff === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                    <div className='relative w-full h-full flex justify-center items-center text-center  text-base'
                        onClick={() => {
                            sort("GAP_diff", "Number")
                        }}>
                        G
                        <img src={(sorters.GAP_diff === 0) ? SORT : (sorters.GAP_diff === 1 ? SORT_UP : SORT_DOWN)}
                            className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                        />
                    </div>
                </div>
            </div>
            <div className='relative w-[13.9%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                Type
            </div>

        </div>
    )
}
