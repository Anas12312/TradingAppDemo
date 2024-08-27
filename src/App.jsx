import { useEffect, useRef, useState } from 'react'
import TickerTable from './Components/TickerTable/TickerTable'
import PriceChart from './Components/PriceChart/PriceChart'
import Details from './Components/DetailedTicker/Details'
import Testing from './Components/Testing'
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Header from './Components/Header'

function App() {
  const [selectedTicker, setSelectedTicker] = useState({})
  useEffect(() => {
    console.log(selectedTicker)
  }, [selectedTicker])
  const layout = [
    { i: "a", x: 1, y: 0, w: 8, h: 10 },
    { i: "b", x: 1, y: 0, w: 4, h: 10 },
    { i: "c", x: 5, y: 0, w: 4, h: 10 }
  ];
  return (
    <div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2400} draggableHandle='.drag-handle' >
        <div key="a" className="grid-item border-2 border-slate-500 rounded-t"><Header text={"Tickers Table"} /><TickerTable setSelectedTicker={setSelectedTicker} /></div>
        <div key="b" className="grid-item border-2 border-slate-500 rounded-t"><Header text={"Price Chart " + (selectedTicker.Ticker ? selectedTicker.Ticker : "")} /><PriceChart src={selectedTicker.priceChart} /></div>
        <div key="c" className="grid-item border-2 border-slate-500 rounded-t"><Header text={"Details " + (selectedTicker.Ticker ? selectedTicker.Ticker : "")}/><Details selectedTicker={selectedTicker} /></div>
      </GridLayout>
    </div>
  )
}

export default App
