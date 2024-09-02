import React, { useState } from 'react'

export default function PriceChart({ ticker }) {
    const charts = [
        'https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/ContentImage/Head%20and%20shoulders.png/jcr:content/renditions/original-size.webp',
        'https://www.tradingacademy.com/assets/images/fec/charting_monthly9yr.jpg',
        'https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/content-2-chart-images/GBP-USD%20(1).png/jcr:content/renditions/original-size.webp'
    ]
    const [selectedChart, setSelectedChart] = useState(charts[0])
    function selectChart(e) {
        setSelectedChart(charts[e.target.id])
    }
    return (
        ticker ? (
            <div className='flex flex-col justify-start items-center h-[90%] w-full border-t p-2'>
                <img className='h-[100%]' src={ticker.src} alt="" />
            </div>
        ) : (
            <div className='flex flex-col justify-start items-center h-[90%] w-full border-t p-2'>
                <div className='flex w-[50%] justify-between'>
                    <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="0" /><div className='pl-2'>chart 1</div></label>
                    <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="1" /><div className='pl-2'>chart 2</div></label>
                    <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="2" /><div className='pl-2'>chart 3</div></label>
                </div>
                <img className='h-[90%]' src={selectedChart} alt="" />
            </div>
            // <div className='flex w-full h-full justify-center items-center text-xl'>
            //     Please select a ticker to display its price chart :)
            // </div>
        )

    )
}
