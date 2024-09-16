import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
export default function ChartModal({ isOpen, setIsOpen, ticker }) {
  const closeViewText = () => {
    setIsOpen(false);
  }
  const [charts, setCharts] = useState([
    // ticker?.heik_url,
    // ticker?.heik_url,
    // ticker?.heik_url,
    ticker?.heik_1min,
    ticker?.heik_1day,
    ticker?.heik_1day,
  ])
  // const [selectedChart, setSelectedChart] = useState(charts[0])
  const [chartIndex, setChartIndex] = useState(0)

  useEffect(() => {
    console.log(ticker)
    setCharts([
      // ticker?.heik_url,
      // ticker?.heik_url,
      // ticker?.heik_url,
      ticker?.heik_1min,
      ticker?.heik_1day,
      ticker?.candel_1min,
    ])
  }, [ticker])

  function selectChart(e) {
    setChartIndex(e.target.id)
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'shadow-xl shadow-slate-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-full w-full absolute flex justify-between items-center border  rounded-md text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeViewText}
        closeTimeoutMS={200}
      >
        {ticker?.heik_1min ? (
        <div className='flex flex-col justify-start items-center h-[90%] w-full bg-[#ffd480] border border-t-0 '>
          <div className='flex w-[50%] justify-between'>
            <label className='flex justify-center items-center'><input onChange={selectChart} checked={chartIndex == 0} type="radio" name="chart" id="0" /><div className='pl-2'>heik_1min</div></label>
            <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="1" /><div className='pl-2'>heik_1day</div></label>
            <label className='flex justify-center items-center'><input onChange={selectChart} type="radio" name="chart" id="2" /><div className='pl-2'>candel_1min</div></label>
          </div>
          {/* <HtmlViewer filePath={selectedChart} /> */}
          <iframe src={charts[chartIndex]} className='h-full w-full' frameborder="0"></iframe>
          {/* <img className='h-[90%]' src={selectedChart} alt="" /> */}
        </div>
        ) : (
        <div className='flex w-full h-[90%] justify-center items-center text-xl bg-[#ffd480] border border-t-0'>
          Please select a ticker to display its price chart :)
        </div>
        )}

      </Modal>
    </div>
  )
}
