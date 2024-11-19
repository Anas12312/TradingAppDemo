import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TickerTable from '../Components/InActive/TickerTable';
import AlarmsTable from "../Components/Alarms/AlarmsTable";

function AlarmLayout({ data }) {

  const layout = [
    { i: "a", x: 0, y: 0, w: 9, h: 14 }
  ];
  return (
    <div className='font-main'>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2550} draggableHandle='.drag-handle' >
        <div key="a" className="grid-item shadow">
            <AlarmsTable
                data={data}
            />
        </div>
        </GridLayout>
    </div>
  )
}

export default AlarmLayout
