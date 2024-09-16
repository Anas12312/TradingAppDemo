import { useEffect, useRef, useState } from 'react'
import TickerTable from '../Components/TickerTable/TickerTable'
import PriceChart from '../Components/PriceChart/PriceChart'
import Details from '../Components/DetailedTicker/Details'
import Testing from '../Components/Testing'
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Header from '../Components/Header'
import Header2 from '../Components/Header2'

function Main({ data, idle, setIdle, timer, selectedTicker, setSelectedTicker }) {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [tick, setTick] = useState(false)

  // useEffect(() => {
  //   console.log(selectedTicker)
  //   const index = data.scan.records.findIndex(x => x.ticker === selectedTicker.ticker);
  //   if (index === -1) {
  //     setSelectedIndex(0)
  //     return
  //   }
  //   setSelectedIndex(index);
  // }, [selectedTicker])

  // useEffect(() => {
  //   if (!data.scan.records.includes(selectedTicker)) {
  //     setSelectedIndex(0)
  //   }
  // }, [data])

  useEffect(() => {
    console.log('data', data.scan.records);

    if(selectedIndex >= (data.scan.records.length-1) && !idle) {
      setSelectedTicker(data.scan.records[data.scan.records.length-1])
      return
    }

    if (data.scan.records.lenght === 0) {
      setSelectedTicker({})
      return
    }
    const ticker = data.scan.records[selectedIndex]


    if (ticker) setSelectedTicker(ticker);
    else {
      setSelectedIndex(0)
    }
  }, [selectedIndex])

  useEffect(() => {
    if (idle) {
      setSelectedIndex(prev => prev + 1)
    }
  }, [tick])

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      console.log(e.key);
      if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => prev - 1)
        setIdle(false)
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => prev + 1)
        setIdle(false)
      }
    })

    setInterval(() => {
      setTick(prev => !prev)
    }, 2000)
  }, [])

  const layout = [
    { i: "a", x: 1, y: 0, w: 8, h: 10 },
    { i: "b", x: 1, y: 0, w: 4, h: 10 },
    { i: "c", x: 5, y: 0, w: 4, h: 10 }
  ];

  return (
    <div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2400} draggableHandle='.drag-handle' >
        <div onClick={(e) => e.stopPropagation()} key="a" className="grid-item shadow"><TickerTable timer={timer} data={data} setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} setIdle={setIdle} /></div>
        <div onClick={(e) => e.stopPropagation()} key="b" className="grid-item shadow"><Header text={"Price Chart " + (selectedTicker?.ticker ? selectedTicker.ticker : "")} /><PriceChart ticker={selectedTicker} /></div>
        <div onClick={(e) => e.stopPropagation()} key="c" className="grid-item shadow"><Header2 text={"Details " + (selectedTicker?.ticker ? selectedTicker.ticker : "")} /><Details selectedTicker={selectedTicker} /></div>
      </GridLayout>
    </div>
  )
}

export default Main
