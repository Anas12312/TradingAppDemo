import { useEffect, useRef, useState } from 'react'
import TickerTable from '../Components/SignalLogsTable/TickerTable'
import PriceChart from '../Components/PriceChart/PriceChart'
import Details from '../Components/DetailedTicker/Details'
import Testing from '../Components/Testing'
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Header from '../Components/Header'
import Header2 from '../Components/Header2'

function Third({ data, idle, setIdle, timer, selectedTicker, setSelectedTicker }) {
  // const [selectedTicker, setSelectedTicker] = useState('')
  // const [selectedTickerData, setSelectedTickerData] = useState({})
  // useEffect(() => {
  //   const tickerData = data.scan.records.filter(x => x.ticker === selectedTicker)[0];
  //   console.log(tickerData);
  //   setSelectedTickerData(tickerData);
  // }, [selectedTicker])


  const [selectedIndex, setSelectedIndex] = useState(0);

  const [tick, setTick] = useState(false)

  useEffect(() => {
    if (!selectedTicker?.ticker) return
    if (!selectedTicker?.company_name) {
      setSelectedTicker(prev => {
        return data.scan.records.find(x => x.ticker === prev.ticker)
      })
    }
  }, [selectedTicker])

  useEffect(() => {
    console.log('data', data.signalLogs.records);

    if (selectedIndex >= (data.signalLogs.records.length - 1) && !idle) {
      setSelectedTicker(data.signalLogs.records[data.signalLogs.records.length - 1])
      return
    }

    if (data.signalLogs.records.lenght === 0) {
      setSelectedTicker({})
      return
    }
    const ticker = data.signalLogs.records[selectedIndex]


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
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => prev + 1)
      }
    })

    setInterval(() => {
      setTick(prev => !prev)
    }, 2000)
  }, [])


  const layout = [
    { i: "a", x: 0, y: 0, w: 9, h: 10 },
    { i: "b", x: 0, y: 0, w: 4.5, h: 9 },
    { i: "c", x: 4.5, y: 0, w: 4.5, h: 9 }
  ];

  return (
    <div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2550} draggableHandle='.drag-handle' >
        <div onClick={(e) => e.stopPropagation()} key="a" className="grid-item shadow"><TickerTable timer={timer} data={data} setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} setIdle={setIdle} /></div>
        <div onClick={(e) => e.stopPropagation()} key="b" className="grid-item shadow"><Header text={"Price Chart " + (selectedTicker?.ticker ? selectedTicker.ticker : "")} /><PriceChart ticker={selectedTicker} /></div>
        <div onClick={(e) => e.stopPropagation()} key="c" className="grid-item shadow"><Header2 text={"Details " + (selectedTicker?.ticker ? selectedTicker.ticker : "")} /><Details selectedTicker={selectedTicker} /></div>
      </GridLayout>
    </div>
  )
}

export default Third
