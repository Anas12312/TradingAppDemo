import { useState, useEffect } from "react"
import Main from "./Tabs/Main"
import Second from './Tabs/Second'
import config from '../config.json'
import Third from "./Tabs/Third"

const TABS = [
  'Scan',
  'Active Signals',
  'Signals Logs',
  'In Trade',
  'Alarms'
]

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function App() {

  const [tab, setTab] = useState(TABS[0])

  const [data, setData] = useState()

  const [idle, setIdle] = useState(false);

  const [timer, setTimer] = useState();

  useEffect(() => {
    console.log('Idle', idle);
  }, [idle])

  async function fetchRecords() {
    const results = await fetch(config.API_URL + '/tickers')
    const response = await results.json()
    setData(response)
    // setHeaders(response.scan.headers)
    // setRecords(response.scan.records)
    // setSearchedRecords(response.records)
    // const sorters = {}
    // response.headers.forEach((h) => {
    //   sorters[h.name] = Sorted.NO
    // })
    // setSorters(sorters)

    await delay(5000)
    await fetchRecords()
  }
  useEffect(() => {

    fetchRecords()

  }, [])


  const [selectedTickerScan, setSelectedTickerScan] = useState({})
  const [selectedTickerSignal, setSelectedTickerSignal] = useState({})
  const [selectedTickerSignalLog, setSelectedTickerSignalLog] = useState({})

  return (
    <div className=""
      onClick={(e) => {
        setSelectedTickerScan({})
        setSelectedTickerSignal({})
        setSelectedTickerSignalLog({})
        if (timer) {
          window.clearTimeout(timer);
        }
        setTimer(window.setTimeout(() => {
          setIdle(true);
        }, 10000))
      }}
    >
      <div className="flex justify-center items-center w-full my-4 ">
        {
          TABS.map(x => (
            <button
              onClick={(e) => { e.stopPropagation(); setTab(TABS[TABS.indexOf(x)]) }}
              className={"px-4 py-3 border-r-0 border-l-0 border-2 hover:bg-blue-500 hover:text-white border-blue-700 font-semibold text-xl last:border-r-2 first:border-l-2 first:rounded-l-full last:rounded-r-full transition-all " + (tab === x ? 'bg-blue-700 hover:bg-blue-700 text-white' : '')}>
              {x == "Scan" && <Tab name={x} number={data?.scan.records.length} />}
              {x == "Active Signals" && <Tab name={x} number={data?.signal.records.length} />}
              {x == "Signals Logs" && <Tab name={x} number={data?.signalLogs.records.length} />}
              {x == "In Trade" && <Tab name={x} />}
              {x == "Alarms" && <Tab color="text-red-500" name={x} />}
            </button>
          ))
        }
      </div>
      {
        tab === TABS[0] && data && <Main setSelectedTicker={setSelectedTickerScan} selectedTicker={selectedTickerScan} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }

      {
        tab === TABS[1] && data && <Second setSelectedTicker={setSelectedTickerSignal} selectedTicker={selectedTickerSignal} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }

      {
        tab === TABS[2] && data && <Third setSelectedTicker={setSelectedTickerSignalLog} selectedTicker={selectedTickerSignalLog} data={data} idle={idle} setIdle={setIdle} timer={timer}  />
      }
    </div>
  )
}
const Tab = ({ name, number = 0, color = "text-green-600 " }) => {
  return (
    <div className="flex flex-col ">
      <div>{name}</div>
      <div className={color + " "}>({number})</div>
    </div>
  )
}
export default App
