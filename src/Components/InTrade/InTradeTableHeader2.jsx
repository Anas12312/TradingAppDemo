import React, { useEffect } from 'react'
import SORT from '../../../images/sort.png'
import SORT_UP from '../../../images/sort-up.png'
import SORT_DOWN from '../../../images/sort-down.png'
export default function InTradeTableHeader2({ sort, header, sorters }) {
    useEffect(() => {
        // console.log(sorters)
        // console.log(header)
    }, [header])
    return (
        <div className='border-l border-r border-black select-none w-full bg-blue-700 font-semibold text-white h-[2rem] flex items-center justify-start text-[1rem] shadow font-Sansation-Bold'>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-base'
                onClick={() => {
                    sort("ticker", "String")
                }}>
                Ticker
                <img src={(sorters.ticker === 0) ? SORT : (sorters.ticker === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-base'
                onClick={() => {
                    sort("price", "Number")
                }}>
                Price
                <img src={(sorters.price === 0) ? SORT : (sorters.price === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-base'
                onClick={() => {
                    sort("float", "Number")
                }}>
                Float
                <img src={(sorters.float === 0) ? SORT : (sorters.float === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-base'
                onClick={() => {
                    sort("volume_today", "Number")
                }}>
                Vol
                <img src={(sorters.volume_today === 0) ? SORT : (sorters.volume_today === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-base'
                onClick={() => {
                    sort("relative_volume", "Number")
                }}>
                Rel Vol
                <img src={(sorters.relative_volume === 0) ? SORT : (sorters.relative_volume === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
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
                        <div className='relative w-[10%] h-full flex justify-center items-center text-center border-r border-t border-blue-200 text-sm'
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
