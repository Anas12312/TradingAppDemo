import React from 'react'
import TableRow from './TableRow'

function extractTime(dateTimeString) {
    const timePattern = /\d{1,2}:\d{2}$/;
    const match = dateTimeString.match(timePattern);
    return match ? match[0] : '';
}

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

                <TableRow property={'Company Name'} value={ticker.company_name} />
                <TableRow property={'Indusry Group'} value={ticker.industry_group} />
                <TableRow property={'Indusry'} value={ticker.industry} />
                <TableRow property={'Sub Industry'} value={ticker.sub_industry} />
                <TableRow property={'Exchange'} value={ticker.exchange} />
                <TableRow property={'Sector'} value={ticker.sector} />
                <TableRow property={'Sub Sector'} value={ticker.sub_sector} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Key Levels
                </div>

                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    1 Min Levels
                </div>

                <TableRow property={'Bullish'} value={ticker.LuxBuyConfirmation_high} />
                <TableRow property={'Bearish'} value={ticker.LuxSellConfirmation_high} />
                <TableRow property={'Bullish Exit'} value={ticker.LuxBuyExitConfirmation_high} />
                <TableRow property={'Bearish Exit'} value={ticker.LuxSellExitConfirmation_high} />
                <TableRow property={'SF Bullish'} value={'0'} />
                <TableRow property={'SF Bearish'} value={'0'} />


                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    Daily Levels
                </div>

                <TableRow property={'Bullish'} value={ticker.LuxBuyConfirmation_high_D} />
                <TableRow property={'Bearish'} value={ticker.LuxSellConfirmation_high_D} />
                <TableRow property={'Bullish Exit'} value={ticker.LuxBuyExitConfirmation_high_D} />
                <TableRow property={'Bearish Exit'} value={ticker.LuxSellExitConfirmation_high_D} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Scanner Info
                </div>

                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    HALT Resume
                </div>
                <TableRow property={'Count'} value={ticker.halt_resume_count} />
                <TableRow property={'Time'} value={extractTime(ticker.halt_resume_time)} />
                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    MOMO
                </div>
                <TableRow property={'Count'} value={ticker.momo_count} />
                <TableRow property={'Time'} value={extractTime(ticker.momo_time)} />
                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    Gap Go
                </div>
                <TableRow property={'Count'} value={ticker.gap_go_count} />
                <TableRow property={'Time'} value={extractTime(ticker.gap_go_time)} />
                <div className='w-full h-8 bg-slate-400 flex justify-center items-center text-white '>
                    Turbo
                </div>
                <TableRow property={'Count'} value={ticker.turbo_count} />
                <TableRow property={'Time'} value={extractTime(ticker.turbo_time)} />

            </div>

        </div>
    )
}
