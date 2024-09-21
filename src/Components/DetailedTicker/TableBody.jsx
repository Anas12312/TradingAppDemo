import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'

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
        return news.map(n => n)
    }

    return (
        <div className='w-full h-full bg-white'>

            <div className='h-full overflow-y-scroll scrollbar-none'>
                {/* {Object.keys(ticker).map((key, i) => {
                    return (
                        <TableRow key={i} property={key} value={ticker[key]} />
                    )
                })} */}

                <div className='flex w-full justify-between'>
                    <div
                        onClick={() => setSelected('stoke')}
                        className={'text-center w-full bg-[#8873da] text-white hover:bg-[#ad98ff] transition-all select-none cursor-pointer ' + (selected === 'stoke' && ' underline font-semibold')}>
                        Stoke Info
                    </div>

                    <div
                        onClick={() => setSelected('key')}
                        className={'text-center w-full bg-[#8873da] text-white hover:bg-[#ad98ff] transition-all select-none cursor-pointer ' + (selected === 'key' && ' underline font-semibold')}>
                        Key Levels

                    </div>

                    <div
                        onClick={() => setSelected('scanner')}
                        className={'text-center w-full bg-[#8873da] text-white hover:bg-[#ad98ff] transition-all select-none cursor-pointer ' + (selected === 'scanner' && ' underline font-semibold')}>
                        Scanner Info
                    </div>

                    <div
                        onClick={() => setSelected('news')}
                        className={'text-center w-full bg-[#8873da] text-white hover:bg-[#ad98ff] transition-all select-none cursor-pointer ' + (selected === 'news' && ' underline font-semibold')}>
                        News ({getNewsCount()})
                    </div>
                    <div
                        onClick={() => setSelected('ai')}
                        className={'text-center w-full bg-[#8873da] text-white hover:bg-[#ad98ff] transition-all select-none cursor-pointer ' + (selected === 'ai' && ' underline font-semibold')}>
                        AI ML
                    </div>
                </div>

                {
                    selected === 'stoke' && (
                        <div className='h-[90%] flex flex-col'>
                            <TableRow property={'Company Name'} value={ticker.company_name} />
                            <TableRow property={'Indusry Group'} value={ticker.industry_group} />
                            <TableRow property={'Indusry'} value={ticker.industry} />
                            <TableRow property={'Sub Industry'} value={ticker.sub_industry} />
                            <TableRow property={'Exchange'} value={ticker.exchange} />
                            <TableRow property={'Sector'} value={ticker.sector} />
                            <TableRow property={'Sub Sector'} value={ticker.sub_sector} />
                        </div>
                    )
                }

                {
                    selected === 'key' && (
                        <div className='h-[90%] flex'>

                            <div className='h-full w-full flex flex-col'>
                                <div className='font-semibold text-center h-full py-3 bg-gray-100 flex border-r-2 border-white justify-center items-center '>
                                    1 Min levels
                                </div>
                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish Exit
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyExitConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish Exit
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellExitConfirmation_high}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        SF Bullish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.bullish_general_Signal_high}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 ">
                                    <div className='w-[35%] text-base font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        SF Bearish
                                    </div>
                                    <div className='w-full h-full text-base flex justify-start border-r items-center text-start truncate pl-5 '>
                                        {ticker.bearish_general_Signal_high}
                                    </div>
                                </div>
                            </div>

                            <div className='h-full w-full flex flex-col'>
                                <div className='font-semibold bg-gray-100 text-center h-full flex justify-center items-center '>
                                    Daily levels
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 border-l-0 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 border-l-0 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bearish
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxSellConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 border-l-0 ">
                                    <div className='w-[35%] text-md font-semibold border-r-2 h-full flex justify-start items-center text-center truncate pl-2'>
                                        Bullish Exit
                                    </div>
                                    <div className='w-[70%] h-full text-md flex justify-start items-center text-start truncate pl-5 '>
                                        {ticker.LuxBuyExitConfirmation_high_D}
                                    </div>
                                </div>

                                <div className="w-full h-full flex relative border border-t-0 border-l-0 ">
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
                        <div className='w-full h-[90%] flex'>
                            <div className='w-full flex flex-col h-full'>
                                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                                    HALT Resume
                                </div>
                                <TableRow property={'Count'} value={ticker.halt_resume_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.halt_resume_time)} />
                                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                                    MOMO
                                </div>
                                <TableRow property={'Count'} value={ticker.momo_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.momo_time)} />
                            </div>

                            <div className='w-full flex flex-col h-full'>
                                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                                    Gap Go
                                </div>
                                <TableRow property={'Count'} value={ticker.gap_go_count} />
                                <TableRow property={'Time'} value={extractTime(ticker.gap_go_time)} />
                                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
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
                                        <thead>
                                            <th className='border border-black px-2 text-base text-start w-[12%]'>Time</th>
                                            <th className='border border-black px-2 text-base text-start'>Title</th>
                                            <th className='border border-black px-2 text-base text-start'>Score</th>
                                            <th className='border border-black px-2 text-base text-start'>Label</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-black px-2 text-base'>{prepareDate(ticker.news_time)}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.news_title}</td>
                                                <td className='border border-black px-2 text-base'>{parseFloat(ticker.sentiment_score).toFixed(3)}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.sentiment_label}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        (getNewsCount() - 1) > 0 && (
                                            <>
                                                <div className='mt-5 mb-2'>Previous News</div>
                                                <table>
                                                    <thead>
                                                        <th className='border border-black px-2 text-base text-start w-[12%]'>Time</th>
                                                        <th className='border border-black px-2 text-base text-start'>Label</th>
                                                        <th className='border border-black px-2 text-base text-start'>Score</th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getPrevNews().map((n) => {
                                                                return (
                                                                    <tr>
                                                                        <td className='border border-black px-2 text-base'>{prepareDate(n.time_published)}</td>
                                                                        <td className='border border-black px-2 text-base'>{n.ticker_sentiment_label}</td>
                                                                        <td className='border border-black px-2 text-base'>{parseFloat(n.ticker_sentiment_score).toFixed(3)}</td>
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
                                    <table>
                                        <thead>
                                            <th className='border border-black px-2 text-base text-start w-[12%]'>Time</th>
                                            <th className='border border-black px-2 text-base text-start'>Score</th>
                                            <th className='border border-black px-2 text-base text-start'>Label</th>
                                            <th className='border border-black px-2 text-base text-start'>Summary</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-black px-2 text-base'>{prepareDate(ticker.aiml_time)}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.aiml_score}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.aiml_label}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.aiml_summary}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            ) : (
                                <div>No AI/ML</div>
                            )}
                        </>
                    )
                }

{
                    selected === 'ai' && (
                        <>
                                <div className='p-5 pt-2 w-full h-[90%] flex flex-col'>
                                    <div className='mb-2'>Recent</div>
                                    <table>
                                        <thead>
                                            <th className='border border-black px-2 text-base text-start w-[12%]'>Time</th>
                                            <th className='border border-black px-2 text-base text-start'>Title</th>
                                            <th className='border border-black px-2 text-base text-start'>Score</th>
                                            <th className='border border-black px-2 text-base text-start'>Label</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-black px-2 text-base'>{prepareDate(ticker.news_time)}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.news_title}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.sentiment_score}</td>
                                                <td className='border border-black px-2 text-base'>{ticker.sentiment_label}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </>
                    )
                }


                {/* 

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Key Levels
                </div>

                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    1 Min Levels
                </div>

                <TableRow property={'Bullish'} value={ticker.LuxBuyConfirmation_high} />
                <TableRow property={'Bearish'} value={ticker.LuxSellConfirmation_high} />
                <TableRow property={'Bullish Exit'} value={ticker.LuxBuyExitConfirmation_high} />
                <TableRow property={'Bearish Exit'} value={ticker.LuxSellExitConfirmation_high} />
                <TableRow property={'SF Bullish'} value={'0'} />
                <TableRow property={'SF Bearish'} value={'0'} />


                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    Daily Levels
                </div>

                <TableRow property={'Bullish'} value={ticker.LuxBuyConfirmation_high_D} />
                <TableRow property={'Bearish'} value={ticker.LuxSellConfirmation_high_D} />
                <TableRow property={'Bullish Exit'} value={ticker.LuxBuyExitConfirmation_high_D} />
                <TableRow property={'Bearish Exit'} value={ticker.LuxSellExitConfirmation_high_D} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    Scanner Info
                </div>

                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    HALT Resume
                </div>
                <TableRow property={'Count'} value={ticker.halt_resume_count} />
                <TableRow property={'Time'} value={extractTime(ticker.halt_resume_time)} />
                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    MOMO
                </div>
                <TableRow property={'Count'} value={ticker.momo_count} />
                <TableRow property={'Time'} value={extractTime(ticker.momo_time)} />
                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    Gap Go
                </div>
                <TableRow property={'Count'} value={ticker.gap_go_count} />
                <TableRow property={'Time'} value={extractTime(ticker.gap_go_time)} />
                <div className='w-full  bg-slate-400 flex justify-center items-center text-white '>
                    Turbo
                </div>
                <TableRow property={'Count'} value={ticker.turbo_count} />
                <TableRow property={'Time'} value={extractTime(ticker.turbo_time)} />

                <div className='w-full h-10 bg-slate-500 flex justify-center items-center text-white font-semibold '>
                    S
                </div>
                <TableRow property={'Sentiment Score'} value={JSON.parse(ticker.s1).sentimentScore} />
                <TableRow property={'Relevance'} value={JSON.parse(ticker.s1).relevance} />
                <TableRow property={'Time'} value={JSON.parse(ticker.s1).time} /> */}

            </div>

        </div>
    )
}
