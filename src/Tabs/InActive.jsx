import { useEffect, useRef, useState } from 'react'
import PriceChart from '../Components/PriceChart/PriceChart'
import Details from '../Components/DetailedTicker/Details'
import Testing from '../Components/Testing'
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Header from '../Components/Header'
import Header2 from '../Components/Header2'
import TickerTable from '../Components/InActive/TickerTable';

function InActive({ data, idle, setIdle, timer, selectedTicker, setSelectedTicker }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [tick, setTick] = useState(false)

  useEffect(() => {
    console.log('data', data.inactive.records);

    if (selectedIndex >= (data.inactive.records.length - 1) && !idle) {
      setSelectedTicker(data.inactive.records[data.inactive.records.length - 1])
      return
    }

    if (data.inactive.records.lenght === 0) {
      setSelectedTicker({})
      return
    }
    const ticker = data.inactive.records[selectedIndex]


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
        document.getElementById('Table-Scan').focus()
        // setSelectedIndex(prev => prev - 1)
        setIdle(false)
      } else if (e.key === 'ArrowDown') {
        document.getElementById('Table-Scan').focus()
        // setSelectedIndex(prev => prev + 1)
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
        <div key="a" className="grid-item shadow"><TickerTable timer={timer} data={data} setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} setIdle={setIdle}/></div>
        <div key="b" className="grid-item shadow"><Header text={"Price Chart " + (selectedTicker.ticker ? selectedTicker.ticker : "")} /><PriceChart ticker={selectedTicker} /></div>
        <div key="c" className="grid-item shadow"><Header2 text={"Details " + (selectedTicker.ticker ? selectedTicker.ticker : "")} /><Details selectedTicker={selectedTicker} /></div>
      </GridLayout>
    </div>
  )
}

export default InActive
