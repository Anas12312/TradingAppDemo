import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
export default function ChartModal({ isOpen, setIsOpen, ticker }) {
  const closeViewText = () => {
    setIsOpen(false);
  }
  // const [selectedChart, setSelectedChart] = useState(charts[0])
  const [chartIndex, setChartIndex] = useState(ticker?.heik_1min)

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
                onSelectionChange={(key) => { console.log(key); setChartIndex(key) }}
              >
                <Tab
                  title="HEIK 1 Min"
                  key="heik_1min"
                />
                <Tab
                  title="HEIK 1 Day"
                  key="heik_1day"
                />
                <Tab
                  title="Candel 1 Min"
                  key="candel_1min"
                />
              </Tabs>
              <div className='cursor-pointer'
                onClick={() => setIsOpen(false)}
              >
                <img className='w-8 rounded-lg hover:bg-white p-2' src="../../../close.png" alt="" />
              </div>
            </div>
            {/* <HtmlViewer filePath={selectedChart} /> */}
            <iframe src={ticker && ticker[chartIndex]} className='h-full w-full' frameborder="0"></iframe>
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
