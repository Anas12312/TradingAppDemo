import React from "react";
import GridLayout from "react-grid-layout";

const Testing = () => {
  const layout = [
    { i: "a", x: 1, y: 0, w: 8, h: 10 },
    { i: "b", x: 1, y: 0, w: 4, h: 10 },
    { i: "c", x: 5, y: 0, w: 4, h: 10 }
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2400}>
      <div key="a" className="grid-item bg-gray-400">Component A</div>
      <div key="b" className="grid-item bg-gray-400">Component B</div>
      <div key="c" className="grid-item bg-gray-400">Component C</div>
    </GridLayout>
  );
};

export default Testing;