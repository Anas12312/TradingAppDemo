import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { FaMinimize } from 'react-icons/fa6';
import Modal from 'react-modal';
import { ChartComponent } from '../TradingViewChart';
export default function ChartModal({ isOpen, setIsOpen, ticker }) {
  const closeViewText = () => {
    setIsOpen(false);
  }
  // const [selectedChart, setSelectedChart] = useState(charts[0])
  const [chartIndex, setChartIndex] = useState(ticker?.heik_1min)
  const [customChart, setCustomChart] = useState(true)


  useEffect(() => {
    console.log(ticker)
  }, [ticker])
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
          <div className='flex flex-col justify-start items-center h-[90%] w-full bg-[#CCE1F6] border border-t-0 '>
            <div className='flex w-full px-4 items-center justify-between'>
              <Tabs
                color='warning'
                variant='bordered'
                size="lg"
                aria-label="Options"
                className="bg-white rounded-2xl mt-2"
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
              <div className='cursor-pointer'
                onClick={() => setIsOpen(false)}
              >
                <FaMinimize />
              </div>
            </div>
            {/* <HtmlViewer filePath={selectedChart} /> */}
            {
              customChart ?
                <div className='w-full h-full'>
                  <ChartComponent symbol={ticker.ticker} fullScreen={true} />
                </div>
                :
                <iframe src={ticker && ticker[chartIndex]} className='h-full w-full' frameborder="0"></iframe>
            }

            {/* <img className='h-[90%]' src={selectedChart} alt="" /> */}
          </div>
        ) : (
          <div className='flex w-full h-[90%] justify-center items-center text-xl bg-[#CCE1F6] border border-t-0'>
            Please select a ticker to display its price chart :)
          </div>
        )}

      </Modal>
    </div>
  )
}
