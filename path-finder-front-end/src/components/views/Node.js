import React, { useState } from 'react';
import '../styles/Node.css';

function Node(props) {
  const nodeTypeToColorMap = {
    0: '#FFFFFF', // free path
    1: '#A9DC76', // start node
    2: '#FF6188', // end node
    3: '#2D2A2E', // wall
    4: '#A9DC76', // node being analyzed
    5: '#FF0000', // node that is part of shortest path
  };

  const [backgroundColor, setColor] = useState(nodeTypeToColorMap[props.type]);
  let map = props.map;
  console.log(props.type);
  return (
    <div
      draggable="true"
      className={'node'}
      style={{
        backgroundColor:
          props.type !== 0 ? nodeTypeToColorMap[props.type] : backgroundColor,
        width: '2%',
        paddingBottom: '2%',
      }}
      onDragOver={(e) => {
        let row = props.x;
        let col = props.y;
        if (
          noSurroundingWalls(row, col, map) ||
          (row > 0 && map[row - 1][col] === 3) ||
          (row < map.length - 1 && map[row + 1][col] === 3) ||
          (col > 0 && map[row][col - 1] === 3) ||
          (col < map[0].length - 1 && map[row][col + 1] === 3)
        ) {
          map[props.x][props.y] = 3;
          setColor(nodeTypeToColorMap[3]);
        }
      }}
      onDragEnd={(e) => {
        props.setWalls(map);
      }}
    />
  );
}

// returns true if a node is not surrounded by any walls.
function noSurroundingWalls(row, col, map) {
  let surroundingNodes = [
    col < map[0].length - 1 ? map[row][col + 1] : undefined,
    col > 0 ? map[row][col - 1] : undefined,
    row > 0 ? map[row - 1][col] : undefined,
    row < map.length - 1 ? map[row + 1][col] : undefined,
    row > 0 && col > 0 ? map[row - 1][col - 1] : undefined,
    row > 0 && col < map[0].length - 1 ? map[row - 1][col + 1] : undefined,
    row < map.length - 1 && col > 0 ? map[row + 1][col - 1] : undefined,
    row < map.length - 1 && col < map[0].length - 1
      ? map[row + 1][col + 1]
      : undefined,
  ];
  if (
    surroundingNodes.every(function (v) {
      return v === 0 || v === undefined;
    })
  ) {
    return true;
  }
  return false;
}

export default Node;
