import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import { Tabs, Tab, Table, TableBody as UITablebody, TableRow as UITableRow, TableHeader, TableColumn, TableCell } from "@nextui-org/react"

function extractTime(dateTimeString) {
    const timePattern = /\d{1,2}:\d{2}$/;
    const match = dateTimeString?.match(timePattern);
    return match ? match[0] : '';
}

export default function TableBody({ ticker }) {

    const [selected, setSelected] = useState('stoke')
    useEffect(() => {
        console.log(ticker)
    }, [ticker])
    function prepareDate(dateTime) {
        const date = new Date(dateTime)
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${month}/${day} ${hours}:${minutes}`;
    }
    function getNewsCount() {
        try {
            if (ticker.news_title) {
                return ticker.Previous_news.length + 1
            }
            return 0
        } catch (e) {
            return 0
        }
    }
    function getPrevNews() {
        console.log(ticker.Previous_news)
        const news = ticker.Previous_news
        return news?.map(n => n)
    }

    return (
        <div className='w-full h-full bg-white px-2'>

            <div className='h-full overflow-y-scroll'>
                {/* {Object.keys(ticker).map((key, i) => {
                    return (
                        <TableRow key={i} property={key} value={ticker[key]} />
                    )
                })} */}

                <div className='flex w-full justify-start'>
                    <Tabs
                        color='warning'
                        variant='bordered'
                        size="lg"
                        aria-label="Options"
                        className="my-2 font-semibold"
                        onSelectionChange={(key) => { console.log(key); setSelected(key) }}
                    >
                        <Tab
                            title="Stoke Info"
                            key="stoke"
                        />
                        <Tab
                            title="Key Levels"
                            key="key"
                        />
                        <Tab
                            title="Scanner Info"
                            key="scanner"
                        />
                        <Tab
                            title={
                                <div>
                                    News ({getNewsCount()})
                                </div>
                            }
                            key="news"
                        />
                        <Tab
                            title="AI ML"
                            key="ai"
                        />
                        <Tab
                            title="In Trade"
                            key="intrade"
                        />
                    </Tabs>
                </div>

                {
                    selected === 'stoke' && (
                        <div className='h-[90%] flex flex-col'>
                            <Table hideHeader
                                className='h-[90%]'
                            >
                                <TableHeader>
                                    <TableColumn></TableColumn>
                                    <TableColumn></TableColumn>
                                </TableHeader>
                                <UITablebody >

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Company Name</TableCell>
                                        <TableCell className='font-semibold'>{ticker.company_name}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Indusry Group</TableCell>
                                        <TableCell className='font-semibold'>{ticker.industry_group}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Indusry</TableCell>
                                        <TableCell className='font-semibold'>{ticker.industry}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Sub Industry</TableCell>
                                        <TableCell className='font-semibold'>{ticker.sub_industry}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Exchange</TableCell>
                                        <TableCell className='font-semibold'>{ticker.exchange}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Sector</TableCell>
                                        <TableCell className='font-semibold'>{ticker.sector}</TableCell>
                                    </UITableRow>

                                    <UITableRow>
                                        <TableCell className='font-semibold'>Sub Sector</TableCell>
                                        <TableCell className='font-semibold'>{ticker.sub_sector}</TableCell>
                                    </UITableRow>

                                </UITablebody>
                            </Table>
                        </div>
                    )
                }

                {
                    selected === 'key' && (
                        <div className='h-[90%] flex space-x-2'>

                            <div className='h-full w-full flex flex-col'>
                                <div className='h-5 text-base font-semibold text-center py-3  flex border-x-2 border-t-2 rounded-t-lg justify-center items-center '>
                                    1 Min levels
                                </div>
                                <div className="w-full h-9 flex relative border-2 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-9 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-9 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish Exit
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyExitConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-9 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish Exit
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellExitConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-9 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        SF Bullish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.bullish_general_Signal_high}
                                    </div>
                                </div>

                                <div className="w-full h-9 flex relative border-2 border-t-0 rounded-b-lg ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        SF Bearish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start  items-center text-start truncate pl-5 '>
                                        {ticker.bearish_general_Signal_high}
                                    </div>
                                </div>
                            </div>

                            <div className='h-full w-full flex flex-col'>
                                <div className='h-5 text-base font-semibold text-center py-3  flex border-x-2 border-t-2 rounded-t-lg justify-center items-center '>
                                    Daily levels
                                </div>

                                <div className="w-full h-12 flex relative border-2 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-12 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-12 flex relative border-2 border-t-0 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish Exit
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyExitConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-12 flex relative border-2 border-t-0 rounded-b-lg">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish Exit
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellExitConfirmation_high_D}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }

                {
                    selected === 'scanner' && (
                        <div className='w-full h-[90%] flex space-x-2 px-2'>
                            <div className='w-full flex flex-col h-10 '>
                                <div className='w-full bg-slate-100  flex justify-center items-center border-2 rounded-t-lg '>
                                    HALT Resume
                                </div>

                                <TableRow property={'Count'} value={ticker.halt_resume_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.halt_resume_time)} />


                                <div className='w-full bg-slate-100  flex justify-center items-center border-2 rounded-t-lg mt-5 '>
                                    MOMO
                                </div>
                                <TableRow property={'Count'} value={ticker.momo_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.momo_time)} />
                            </div>

                            <div className='w-full flex flex-col h-10'>
                                <div className='w-full bg-slate-100  flex justify-center items-center border-2 rounded-t-lg '>
                                    Gap Go
                                </div>
                                <TableRow property={'Count'} value={ticker.gap_go_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.gap_go_time)} />
                                <div className='w-full bg-slate-100  flex justify-center items-center border-2 rounded-t-lg mt-4 '>
                                    Turbo
                                </div>
                                <TableRow property={'Count'} value={ticker.turbo_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.turbo_time)} />
                            </div>


                        </div>
                    )
                }

                {
                    selected === 'news' && (
                        <>
                            {ticker.news_title ? (
                                <div className='p-5 pt-2 w-full h-[90%] flex flex-col'>
                                    <div className='mb-2'>Recent</div>
                                    <table>
                                        <thead className='bg-slate-100'>
                                            <th className='border border-slate-300 px-2 text-base text-start w-[12%]'>Time</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Title</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Score</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Label</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-slate-300 px-2 text-base'>{prepareDate(ticker.news_time)}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{ticker.news_title}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{parseFloat(ticker.sentiment_score).toFixed(3)}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{ticker.sentiment_label}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        (getNewsCount() - 1) > 0 && (
                                            <>
                                                <div className='mt-5 mb-2'>Previous News</div>
                                                <table>
                                                    <thead>
                                                        <th className='border border-slate-300 px-2 text-base text-start w-[12%]'>Time</th>
                                                        <th className='border border-slate-300 px-2 text-base text-start'>Label</th>
                                                        <th className='border border-slate-300 px-2 text-base text-start'>Score</th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getPrevNews().map((n) => {
                                                                return (
                                                                    <tr>
                                                                        <td className='border border-slate-300 px-2 text-base'>{prepareDate(n.time_published)}</td>
                                                                        <td className='border border-slate-300 px-2 text-base'>{n.ticker_sentiment_label}</td>
                                                                        <td className='border border-slate-300 px-2 text-base'>{parseFloat(n.ticker_sentiment_score).toFixed(3)}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                    }
                                </div>
                            ) : (
                                <div>No News</div>
                            )}
                        </>
                    )
                }
                {
                    selected === 'ai' && (
                        <>
                            {ticker.aiml_time ? (
                                <div className='p-5 pt-2 w-full h-[90%] flex flex-col'>
                                    <div className='mb-2'>Recent</div>
                                    <table >
                                        <thead className='bg-slate-100'>
                                            <th className='border border-slate-300 px-2 text-base text-start w-[12%]'>Time</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Score</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Label</th>
                                            <th className='border border-slate-300 px-2 text-base text-start'>Summary</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-slate-300 px-2 text-base'>{prepareDate(ticker.aiml_time)}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{ticker.aiml_score}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{ticker.aiml_label}</td>
                                                <td className='border border-slate-300 px-2 text-base'>{ticker.aiml_summary}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            ) : (
                                <div className='text-lg ml-5 font-semibold' >No AI/ML</div>
                            )}
                        </>
                    )
                }

                {
                    selected == "intrade" && (
                        <Table>
                            <TableHeader>
                                <TableColumn className='text-center'>Trend Catcher</TableColumn>
                                <TableColumn className='text-center'>Trend Tracer</TableColumn>
                                <TableColumn className='text-center'>Smooth HA</TableColumn>
                                <TableColumn className='text-center'>EMA 10 Bullish</TableColumn>
                                <TableColumn className='text-center'>EMA 10 Raising</TableColumn>
                                <TableColumn className='text-center'>VWAP Raising</TableColumn>
                                <TableColumn className='text-center'>Price Angle</TableColumn>
                            </TableHeader>
                            <UITablebody>
                                <UITableRow>
                                <TableCell className='pl-14 text-center'>
                                                {ticker.trendcatcher_status == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '> 
                                                {ticker.trendtracer_status == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '>
                                                {ticker.smooth_ha == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '>
                                                {ticker.ema10_bullish == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '>
                                                {ticker.ema10_raising == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '>
                                                {ticker.vwap_raising == 1 ? (
                                                    <div className='bg-green-500 w-3 h-3 rounded-full'></div>
                                                ) : (
                                                    <div className='bg-red-500 w-3 h-3 rounded-full'></div>
                                                )}
                                            </TableCell>
                                            <TableCell className='pl-14 '>
                                                {ticker.price_angle == "-3" && (<div className='bg-red-500 w-3 h-3 rounded-full'></div>)}
                                                {ticker.price_angle == "-2" && (<div className='bg-orange-500 w-3 h-3 rounded-full'></div>)}
                                                {ticker.price_angle == "-1" && (<div className='bg-yellow-500 w-3 h-3 rounded-full'></div>)}
                                                {/* {ticker.price_angle == "0" && (<div className='bg-white w-3 h-3 rounded-full'></div>)} */}
                                                {ticker.price_angle == "1" && (<div className='bg-blue-500 w-3 h-3 rounded-full'></div>)}
                                                {ticker.price_angle == "2" && (<div className='bg-[#a4f16d] w-3 h-3 rounded-full'></div>)}
                                                {ticker.price_angle == "3" && (<div className='bg-green-500 w-3 h-3 rounded-full'></div>)}
                                            </TableCell>
                                </UITableRow>
                            </UITablebody>
                        </Table>
                    )
                }



            </div>

        </div>
    )
}
