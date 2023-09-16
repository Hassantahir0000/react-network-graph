import * as React from "react";
import { render } from "react-dom";
import { Graph } from "react-d3-graph";
import "./styles.css";
import { useState } from "react";

const boundaryX = 450;
const boundaryY = 540;
const boundaryWidth = 200;
const boundaryHeight = 100;

let selectedNode;

const data = {
  nodes: [
    { id: "AMF/UPF 1", color: "red", size: 600, x: 100, y: 10 },
    { id: "AMF/UPF 2", color: "red", size: 600, x: 300, y: 10 },
    {
      id: "Provide Edge Routers",
      color: "red",
      size: 600,
      x: 200,
      y: 500,
    },

    {
      id: "CSR 1",
      color: "lightblue",
      size: 600,
      x: 500,
      y: 500,
    },
    {
      id: "CSR 2",
      color: "lightblue",
      size: 600,
      x: 550,
      y: 540,
    },

    {
      id: "CSR 3",
      color: "lightblue",
      size: 600,
      x: 500,
      y: 580,
    },

    {
      id: "CSR 4",
      color: "lightblue",
      size: 600,
      x: 450,
      y: 540,
    },

    {
      id: "CSR 5",
      color: "lightblue",
      size: 600,
      x: 10,
      y: 500,
    },
    {
      id: "CSR 6",
      color: "lightblue",
      size: 600,
      x: -50,
      y: 540,
    },

    {
      id: "CSR 7",
      color: "lightblue",
      size: 600,
      x: 10,
      y: 580,
    },

    {
      id: "CSR 8",
      color: "lightblue",
      size: 600,
      x: 50,
      y: 540,
    },

    { id: "CU 1", color: "blue", size: 600, x: 100, y: 300 },
    { id: "CU 2", color: "blue", size: 600, x: 300, y: 300 },
    { id: "DU 1", x: 400, y: 120 },
    { id: "DU 2", x: 500, y: 190 },
    { id: "DU 3", x: 500, y: 290 },
    { id: "DU 4", x: 500, y: 390 },

    { id: "DU 5", x: 10, y: 120 },
    { id: "DU 6", x: -100, y: 190 },
    { id: "DU 7", x: -100, y: 290 },
    { id: "DU 8", x: -100, y: 390 },

    { id: "RU 1", color: "tomato", x: 410, y: 90 },
    { id: "RU 2", color: "tomato", x: 440, y: 120 },

    { id: "RU 3", color: "tomato", x: 510, y: 90 },
    { id: "RU 4", color: "tomato", x: 540, y: 120 },
    { id: "RU 5", color: "tomato", x: 570, y: 150 },

    { id: "RU 6", color: "tomato", x: 530, y: 260 },
    { id: "RU 7", color: "tomato", x: 560, y: 290 },

    { id: "RU 8", color: "tomato", x: 550, y: 390 },
    { id: "RU 9", color: "tomato", x: 540, y: 410 },
    { id: "RU 10", color: "tomato", x: 520, y: 360 },

    { id: "RU 11", color: "tomato", x: -20, y: 50 },
    { id: "RU 12", color: "tomato", x: -40, y: 90 },

    { id: "RU 13", color: "tomato", x: -150, y: 150 },
    { id: "RU 14", color: "tomato", x: -160, y: 180 },
    { id: "RU 15", color: "tomato", x: -150, y: 220 },

    { id: "RU 16", color: "tomato", x: -170, y: 270 },
    { id: "RU 17", color: "tomato", x: -180, y: 320 },

    { id: "RU 18", color: "tomato", x: -120, y: 350 },
    { id: "RU 19", color: "tomato", x: -160, y: 380 },
    { id: "RU 20", color: "tomato", x: -120, y: 420 },
  ],
  links: [
    { source: "AMF/UPF 2", target: "CU 2" },
    { source: "AMF/UPF 2", target: "CU 1" },
    { source: "AMF/UPF 1", target: "CU 2" },
    { source: "AMF/UPF 1", target: "CU 1" },
    { source: "CU 2", target: "DU 1" },
    { source: "CU 2", target: "DU 2" },
    { source: "CU 2", target: "DU 3" },
    { source: "CU 2", target: "DU 4" },
    { source: "CU 1", target: "DU 5" },
    { source: "CU 1", target: "DU 6" },
    { source: "CU 1", target: "DU 7" },
    { source: "CU 1", target: "DU 8" },
    { source: "DU 1", target: "RU 1" },
    { source: "DU 1", target: "RU 2" },
    { source: "DU 2", target: "RU 3" },
    { source: "DU 2", target: "RU 4" },
    { source: "DU 2", target: "RU 5" },
    { source: "DU 3", target: "RU 6" },
    { source: "DU 3", target: "RU 7" },
    { source: "DU 4", target: "RU 8" },
    { source: "DU 4", target: "RU 9" },
    { source: "DU 4", target: "RU 10" },
    { source: "DU 5", target: "RU 11" },
    { source: "DU 5", target: "RU 12" },
    { source: "DU 6", target: "RU 13" },
    { source: "DU 6", target: "RU 14" },
    { source: "DU 6", target: "RU 15" },
    { source: "DU 7", target: "RU 16" },
    { source: "DU 7", target: "RU 17" },
    { source: "DU 8", target: "RU 18" },
    { source: "DU 8", target: "RU 19" },
    { source: "DU 8", target: "RU 20" },
  ],
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    labelProperty: "id",
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
  staticGraph: true, // Prevents nodes from moving
};

function App() {
  const [selectedNode, setSelectedNode] = React.useState(null);

  const onClickNode = (nodeId) => {
    const updatedData = { ...data };

    // Find the selected node in the data and highlight it
    updatedData.nodes = updatedData.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, color: "lightgreen" };
      } else {
        return {
          ...node,
          color: node.color === "lightgreen" ? "lightblue" : node.color,
        };
      }
    });
    setSelectedNode(nodeId);
    console.log(`Clicked node ${nodeId}`);
  };

  return (
    <>
      <div className="filter">
        <div className="filter-row">
          <div className="filter-item">
            <label className="label-primary">Region</label>
            <br></br>
            <select className="select-node">
              <option>Denver Region</option>
              <option>Dallas Region</option>
              <option>Chicago Region</option>
            </select>
          </div>

          <div className="filter-item">
            <label className="label-primary">Zone</label>
            <br></br>
            <select className="select-node">
              <option>Den Zone 1</option>
              <option>Den Zone 2</option>
              <option>Dal Zone 1</option>
              <option>Dal Zone 2</option>
              <option>Chicago Zone 1</option>
              <option>Chicago Zone 2</option>
            </select>
          </div>
          <div className="filter-item">
            <label className="label-primary">G Node</label>
            <br></br>
            <select className="select-node">
              <option>g NB1</option>
              <option>g NB2</option>
              <option>g NB3</option>
              <option>g NB4</option>
              <option>g NB5</option>
              <option>g NB6</option>
            </select>
          </div>

          <div className="filter-item">
            <label className="label-primary">Filter</label>
            <br></br>
            <select className="select-node">
              <option>AMF/UPF 1</option>
              <option>AMF/UPF 2</option>
              <option>CU 1</option>
              <option>CU 2</option>
              <option>DU 1</option>
              <option>DU 2</option>
              <option>DU 3</option>
              <option>DU 4</option>
              <option>DU 5</option>
              <option>DU 6</option>
              <option>DU 7</option>
              <option>DU 8</option>
              <option>RU 1</option>
              <option>RU 2</option>
              <option>RU 3</option>
              <option>RU 4</option>
              <option>RU 5</option>
              <option>RU 6</option>
              <option>RU 7</option>
              <option>RU 8</option>
              <option>RU 9</option>
              <option>RU 10</option>
              <option>CSR 1</option>
              <option>CSR 2</option>
              <option>CSR 3</option>
              <option>CSR 4</option>
              <option>CSR 5</option>
              <option>CSR 6</option>
              <option>CSR 7</option>
              <option>CSR 8</option>
            </select>
          </div>

          <div className="filter-item">
            <button className="button primary-button">Search</button>
          </div>
        </div>

        <div>
          <label className="label-primary">Glossary</label>
          <br></br>
          <ul>
            <li>AMF : Access and Mobility Management System Function</li>
            <li>UPF : User Plane Function</li>
            <li>CSR : Cell Site Router</li>
            <li>CSR : Cell Site Router</li>
            <li>CU : Control Unit</li>
            <li>DU : Distributed Unit</li>
            <li>RU : Radio Unit</li>
          </ul>
        </div>
      </div>

      {selectedNode && (
        <div className="node-info">
          <h2>Node: {selectedNode}</h2>
          <p className="status">Connected</p>
          <p className="">Health: Good</p>
          <p className="">Status: Active</p>
          {/* Add other node information here */}
        </div>
      )}
      <div className="App">
        <Graph
          id="graph-id"
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
        />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
