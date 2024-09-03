import { useState, useEffect } from "react"
import Main from "./Tabs/Main"
import Second from './Tabs/Second'
import config from '../config.json'

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
    <>
      <div className="flex justify-center space-x-3 items-center w-full my-4 ">
        {
          TABS.map(x => (
            <button
              onClick={() => setTab(TABS[TABS.indexOf(x)])}
              className={"px-4 py-3 border-2 border-blue-700 rounded font-semibold text-xl " + (tab === x ? 'bg-blue-700 text-white' : '')}>
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
    </>
  )
}

export default App
