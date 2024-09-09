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

  return (
    <div className="">
      <div className="flex justify-center items-center w-full my-4 ">
        {
          TABS.map(x => (
            <button
              onClick={() => setTab(TABS[TABS.indexOf(x)])}
              className={"px-4 py-3 border-r-0 border-l-0 border-2 hover:bg-blue-500 hover:text-white border-blue-700 font-semibold text-xl last:border-r-2 first:border-l-2 first:rounded-l-full last:rounded-r-full transition-all " + (tab === x ? 'bg-blue-700 hover:bg-blue-700 text-white' : '')}>
              {x}
            </button>
          ))
        }
      </div>
      {
        tab === TABS[0] && data && <Main data={data} />
      }

      {
        tab === TABS[1] && data && <Second data={data} />
      }

      {
        tab === TABS[2] && data && <Third data={data} />
      }
    </div>
  )
}

export default App
