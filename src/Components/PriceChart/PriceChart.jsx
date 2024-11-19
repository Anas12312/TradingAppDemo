import React, { useEffect, useState } from 'react'
import ChartModal from './Modal'
import { Tab, Tabs } from '@nextui-org/react'
import { FaMaximize } from 'react-icons/fa6'
import { ChartComponent } from '../TradingViewChart'
export default function PriceChart({ ticker }) {

    // const [selectedChart, setSelectedChart] = useState(charts[0])
    const [chartIndex, setChartIndex] = useState(ticker?.heik_1min)

    const [customChart, setCustomChart] = useState(true)

    useEffect(() => {
        console.log(ticker)
    }, [ticker])

    useEffect(() => {
        const intervalId = setInterval(() => {
            document.getElementById("price_chart").src += ""
        }, 30_000)

        return () => clearInterval(intervalId)
    }, [])
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ChartModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                ticker={ticker}
            />
            {ticker?.heik_1min ? (
                <div className='flex flex-col justify-start items-center h-[90%] w-full bg-[#CCE1F6] border border-t-0 '>
                    <div className='flex w-full px-2 items-center justify-between'>
                        <Tabs
                            color='warning'
                            variant='bordered'
                            size="lg"
                            aria-label="Options"
                            className="bg-white rounded-2xl mt-2 font-semibold"
                            onSelectionChange={(key) => {
                                console.log(key);
                                if (key === 'custom_chart') setCustomChart(true)
                                else {
                                    setCustomChart(false)
                                    setChartIndex(key)
                                }
                            }}
                        >
                            <Tab
                                title="TV 1 Min"
                                key={"custom_chart"}
                            />
                            <Tab
                                title="TV 1 Day"
                                key="candel_1min"
                            />
                            <Tab
                                title="TV Advance"
                                key="heik_1min"
                            />
                            <Tab
                                title="Custom Chart"
                                key="heik_1day"
                            />

                        </Tabs>
                        <div
                            className='cursor-pointer hover:bg-white p-1 rounded-lg mt-1'
                            onClick={() => setIsOpen(true)}
                        >
                            <FaMaximize />
                        </div>
                    </div>
                    {/* <HtmlViewer filePath={selectedChart} /> */}
                    {
                        customChart ?
                            <div className='w-full h-full'>
                                <ChartComponent symbol={ticker.ticker} />
                            </div>
                            :
                            <iframe id='price_chart' src={ticker && ticker[chartIndex]} className='h-full w-full' frameborder="0"></iframe>
                    }
                    {/* <img className='h-[90%]' src={selectedChart} alt="" /> */}
                </div>
            ) : (
                <div className='flex w-full h-[90%] justify-center items-center text-xl bg-[#CCE1F6] border border-t-0'>
                    Please select a ticker to display its price chart :)
                </div>
            )}
        </>

    )
}

