import React, { useState, useEffect } from 'react';
import '../styles/Node.css';

function Node(props) {
  const nodeIDToColorMap = {
    0: '#FFFFFF', // free path
    1: '#A9DC76', // start node
    2: '#F92672', // end node
    3: '#2D2A2E', // wall
    4: '#AB9DF2', // node being analyzed
    5: '#FD971F', // node that is part of shortest path
  };

  const nodeTypeToIDMap = {
    'free path': 0,
    start: 1,
    end: 2,
    wall: 3,
  };

  let map = [...props.map];
  const [backgroundColor, setBackgroundColor] = useState(
    nodeIDToColorMap[props.type]
  );

  useEffect(() => {
    setBackgroundColor(nodeIDToColorMap[props.type]);
  }, [props.type]);

  return (
    <div
      draggable="true"
      className={'node'}
      style={{
        backgroundColor: backgroundColor,
        width: '2%',
        paddingBottom: '2%',
      }}
      onDragStart={(e) => {
        if (!props.visualizationInProgress) {
          if (props.type === nodeTypeToIDMap['end']) {
            map[props.x][props.y] = nodeTypeToIDMap['free path'];
            setBackgroundColor(nodeIDToColorMap[0]);
            props.updateNodes(map);
            props.setRepositioningEndNode(true);
          } else if (props.type === nodeTypeToIDMap['start']) {
            map[props.x][props.y] = nodeTypeToIDMap['free path'];
            setBackgroundColor(nodeIDToColorMap[0]);
            props.updateNodes(map);
            props.setRepositioningStartNode(true);
          }
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!props.visualizationInProgress) {
          if (!props.repositioningEndNode && !props.repositioningStartNode) {
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
              setBackgroundColor(nodeIDToColorMap[3]);
            }
          }
        }
      }}
      onDrop={(e) => {
        if (!props.visualizationInProgress) {
          if (props.repositioningEndNode) {
            map[props.x][props.y] = 2;
            setBackgroundColor(nodeIDToColorMap[2]);
            props.updateNodes(map);
            props.setRepositioningEndNode(false);
          } else if (props.repositioningStartNode) {
            map[props.x][props.y] = 1;
            setBackgroundColor(nodeIDToColorMap[1]);
            props.updateNodes(map);
            props.setRepositioningStartNode(false);
          } else props.updateNodes(map);
        }
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
