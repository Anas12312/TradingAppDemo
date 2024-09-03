import React from 'react'
import TableRow from './TableRow'

export default function TableBody({ ticker }) {
    return (
        <div className='w-full h-[100%]'>

            <div className='border-2 h-full
                        [&>*:nth-child(even)]:border-slate-200 [&>*:nth-child(odd)]:border-slate-300
                            border-x border-b overflow-y-scroll scrollbar-none'>
                {/* {Object.keys(ticker).map((key, i) => {
                    return (
                        <TableRow key={i} property={key} value={ticker[key]} />
                    )
                })} */}

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Stoke Information
                </div>

                <TableRow property={'Company Name'} value={'ticker[key]'} />
                <TableRow property={'Indusry Group'} value={'ticker[key]'} />
                <TableRow property={'Exchange'} value={'ticker[key]'} />
                <TableRow property={'Sector'} value={'ticker[key]'} />
                <TableRow property={'Sub Industry'} value={'ticker[key]'} />
                <TableRow property={'Sub Sector'} value={'ticker[key]'} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Key Levels
                </div>

                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    1 Min Levels
                </div>

                <TableRow property={'Bullish'} value={'ticker[key]'} />
                <TableRow property={'Bearish'} value={'ticker[key]'} />
                <TableRow property={'Bullish Exit'} value={'ticker[key]'} />
                <TableRow property={'Bearish Exit'} value={'ticker[key]'} />
                <TableRow property={'SF Bullish'} value={'ticker[key]'} />
                <TableRow property={'SF Bearish'} value={'ticker[key]'} />


                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    Daily Levels
                </div>

                <TableRow property={'Bullish'} value={'ticker[key]'} />
                <TableRow property={'Bearish'} value={'ticker[key]'} />
                <TableRow property={'Bullish Exit'} value={'ticker[key]'} />
                <TableRow property={'Bearish Exit'} value={'ticker[key]'} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Scanner Info
                </div>

                <TableRow property={'H'} value={'ticker[key]'} />
                <TableRow property={'M'} value={'ticker[key]'} />
                <TableRow property={'G'} value={'ticker[key]'} />
                <TableRow property={'T'} value={'ticker[key]'} />

            </div>

        </div>
    )
}
