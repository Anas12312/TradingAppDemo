import React, { useEffect, useState } from 'react'
import HtmlViewer from './HTMLViewer'

export default function PriceChart({ ticker }) {

    const [charts, setCharts] = useState([
        ticker?.heik_1min,
        ticker?.heik_1day,
        ticker?.candel_1min,
    ])
    // const [selectedChart, setSelectedChart] = useState(charts[0])
    const [chartIndex, setChartIndex] = useState(0)

    useEffect(() => {
        setCharts([
            ticker?.heik_1min,
            ticker?.heik_1day,
            ticker?.candel_1min,
        ])
    }, [ticker])

    function selectChart(e) {
        setChartIndex(e.target.id)
    }
    return (
        ticker?.heik_1day ? (
            <div className='flex flex-col justify-start items-center h-[90%] w-full border-t p-2'>
                <div className='flex w-[50%] justify-between'>
                    <label className='flex justify-center items-center'><input d onChange={selectChart} type="radio" name="chart" id="0" /><div className='pl-2'>heik_1min</div></label>
                    <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="1" /><div className='pl-2'>heik_1day</div></label>
                    <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="2" /><div className='pl-2'>candel_1min</div></label>
                </div>
                {/* <HtmlViewer filePath={selectedChart} /> */}
                <iframe src={charts[chartIndex]}  className='h-[90%] w-full' frameborder="0"></iframe>
                {/* <img className='h-[90%]' src={selectedChart} alt="" /> */}
            </div>
        ) : (
            <div className='flex w-full h-full justify-center items-center text-xl'>
                Please select a ticker to display its price chart :)
            </div>
        )

    )
}
