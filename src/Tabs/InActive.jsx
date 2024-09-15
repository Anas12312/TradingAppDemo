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

function InActive({data}) {
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
        <div key="a" className="grid-item shadow"><TickerTable data={data} setSelectedTicker={setSelectedTicker} /></div>
        <div key="b" className="grid-item shadow"><Header text={"Price Chart " + (selectedTicker.ticker ? selectedTicker.ticker : "")} /><PriceChart ticker={selectedTicker} /></div>
        <div key="c" className="grid-item shadow"><Header2 text={"Details " + (selectedTicker.ticker ? selectedTicker.ticker : "")}/><Details selectedTicker={selectedTicker} /></div>
      </GridLayout>
    </div>
  )
}

export default InActive
