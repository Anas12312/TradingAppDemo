import { useState, useEffect } from "react"
import Main from "./Tabs/Main"
import Second from './Tabs/Second'
import config from '../config.json'
import Third from "./Tabs/Third"
import InActive from "./Tabs/InActive"
import InTrade from "./Tabs/InTrade"
import { Tabs, Tab as NextTab, Button } from "@nextui-org/react"
import { FaSignOutAlt } from "react-icons/fa"

const TABS = [
  'Scan',
  'Active Signals',
  'In Trade',
  'Signals Logs',
  'Inactive',
  'Alarms'
]

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function App({ setIsLoggedIn }) {

  const [tab, setTab] = useState(TABS[0])

  const [data, setData] = useState()

  const [idle, setIdle] = useState(false);

  const [timer, setTimer] = useState();

  useEffect(() => {
    console.log('Idle', idle);
  }, [idle])

  async function fetchRecords() {
    updateEasternTime()
    const results = await fetch(config.API_URL + '/tickers')
    const response = await results.json()
    setData(response)

    await delay(1_000)
    await fetchRecords()
  }
  useEffect(() => {

    fetchRecords()

  }, [])
  useEffect(() => {
    let notifyFlag = true
    if(data?.scan?.records) {
      data?.scan?.records?.forEach(t => {
        if(t.notify == "False") {
          notifyFlag = false
        }
      })
      setNotificationsIndicator(notifyFlag)
    }
  }, [data])

  const [selectedTickerScan, setSelectedTickerScan] = useState({})
  const [selectedTickerSignal, setSelectedTickerSignal] = useState({})
  const [selectedTickerSignalLog, setSelectedTickerSignalLog] = useState({})
  const [easternTime, setEasternTime] = useState('')

  const [notificationsIndicator, setNotificationsIndicator] = useState(false)

  const updateEasternTime = () => {
    const currentEasternTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'short',
      timeStyle: 'medium',
    });
    setEasternTime(currentEasternTime);
  };


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
      <div className="flex justify-center items-center w-full my-4 font-main">

        <div className="absolute top-10 left-10 text-2xl p-2">
          {
            easternTime
          }
        </div>
        <div className="absolute top-10 right-10 flex gap-2">
          <div>
            {
              notificationsIndicator ? (
                <Button
                  color="danger"
                  onPress={() => {
                    fetch(config.API_URL + '/tickers/unotify-all', {
                      method: "POST"
                    })
                  }}
                >
                  Disable notifications for all
                </Button>
              ) : (
                <Button
                  color="primary"
                  onPress={
                    () => {
                      fetch(config.API_URL + '/tickers/notify-all', {
                        method: "POST"
                      })
                    }}
                >
                  Enable notifications for all
                </Button>
              )
            }
          </div>
          <div onClick={() => {
            setIsLoggedIn(false)
          }} className="bg-red-600 flex justify-center items-center text-white rounded-lg hover:bg-red-800 cursor-pointer px-3 p-2">
            <FaSignOutAlt />
          </div>
        </div>
        <Tabs
          size="lg"
          aria-label="Options"
          color="primary"
          className=""
          onSelectionChange={(key) => { console.log(key); setTab(TABS[TABS.indexOf(key)]) }}
          disableAnimation
        >
          {
            TABS.map((x, i) => (
              <NextTab
                className="py-8"
                key={x}
                title={
                  <div className="flex flex-col font-semibold">
                    <div className="">{x}</div>
                    <div className={"text-orange-400"}>({x == "Scan" && data?.scan?.records?.length}
                      {x == "Active Signals" && data?.signal?.records?.length}
                      {x == "Signals Logs" && data?.signalLogs?.records?.length}
                      {x == "Inactive" && data?.inactive?.records?.length}
                      {x == "In Trade" && data?.intrade?.records?.length}
                      {x == "Alarms" && 0})</div>
                  </div>
                } />
            ))
          }
        </Tabs>

      </div>
      {
        tab === TABS[0] && data && <Main setSelectedTicker={setSelectedTickerScan} selectedTicker={selectedTickerScan} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }

      {
        tab === TABS[1] && data && <Second setSelectedTicker={setSelectedTickerSignal} selectedTicker={selectedTickerSignal} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }

      {
        tab === TABS[2] && data && <InTrade setSelectedTicker={setSelectedTickerSignalLog} selectedTicker={selectedTickerSignalLog} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }

      {
        tab === TABS[4] && data && <InActive setSelectedTicker={setSelectedTickerSignalLog} selectedTicker={selectedTickerSignalLog} data={data} />
      }
      {
        tab === TABS[3] && data && <Third setSelectedTicker={setSelectedTickerSignalLog} selectedTicker={selectedTickerSignalLog} data={data} idle={idle} setIdle={setIdle} timer={timer} />
      }
    </div >
  )
}

export default App
