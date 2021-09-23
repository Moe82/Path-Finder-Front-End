import React, { useState } from 'react';

import '../styles/Node.css';

// returns true if a node is not surrounded by any walls.
function noSurroundingWalls(row, col, nodes) {
  let surroundingNodes = [
    col < nodes[0].length - 1 ? nodes[row][col + 1] : undefined,
    col > 0 ? nodes[row][col - 1] : undefined,
    row > 0 ? nodes[row - 1][col] : undefined,
    row < nodes.length - 1 ? nodes[row + 1][col] : undefined,
    row > 0 && col > 0 ? nodes[row - 1][col - 1] : undefined,
    row > 0 && col < nodes[0].length - 1 ? nodes[row - 1][col + 1] : undefined,
    row < nodes.length - 1 && col > 0 ? nodes[row + 1][col - 1] : undefined,
    row < nodes.length - 1 && col < nodes[0].length - 1
      ? nodes[row + 1][col + 1]
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

function Node(props) {
  const [backgroundColor, setColor] = useState(props.backgroundColor);
  const [isHighlited, setHighlited] = useState(props.isWall);
  let nodes = props.nodes;
  return (
    <div
      draggable="true"
      className={'node'}
      style={{
        backgroundColor: backgroundColor,
        width: '2%',
        paddingBottom: '2%',
      }}
      onDragOver={(e) => {
        let row = props.x;
        let col = props.y;

        if (
          noSurroundingWalls(row, col, nodes) ||
          (row > 0 && nodes[row - 1][col] === 3) ||
          (row < nodes.length - 1 && nodes[row + 1][col] === 3) ||
          (col > 0 && nodes[row][col - 1] === 3) ||
          (col < nodes[0].length - 1 && nodes[row][col + 1] === 3)
        ) {
          nodes[props.x][props.y] = 3;
          setColor('#2D2A2E');
          setHighlited(true);
        }
      }}
      onDragEnd={(e) => {
        props.setWalls(nodes);
      }}
    />
  );
}
export default Node;
