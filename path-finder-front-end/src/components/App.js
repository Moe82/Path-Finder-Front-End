import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { GridView, Node } from './views';
import AStar from './algorithms/AStar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCols: 50,
      numRows: 50,
      // map is an simple array representation of all the nodes. A value of 0 represents a free path,
      // 1 represents the start node, 2 represents the end node, 3 represents a wall.
      map: [],
    };
  }

  componentDidMount = () => {
    let m = [];
    for (let row = 0; row < this.state.numRows; row++) {
      let currentColumn = [];
      for (let col = 0; col < this.state.numCols; col++) {
        currentColumn.push(0);
      }
      m.push(currentColumn);
    }

    // set default locations for start and end nodes.
    let startNodeCoords = [1, 1];
    let endNodeCoords = [9, 9];
    m[startNodeCoords[0]][startNodeCoords[1]] = 1; // start node
    m[endNodeCoords[0]][endNodeCoords[1]] = 2; // end node

    // construct an 2d array of nodes.
    this.setState({ map: m }, () => {
      let nodes = [];
      for (let row = 0; row < this.state.numRows; row++) {
        let currentColumn = [];
        for (let col = 0; col < this.state.numCols; col++) {
          currentColumn.push(0);
        }
      }
    });
  };

  updateNodes = (nodes) => {
    let map = this.state.map;
    for (let row = 0; row < nodes.length; row++) {
      for (let col = 0; col < this.state.numCols; col++) {
        if (nodes[row][col] !== map[row][col]) {
          map[row][col] = nodes[row][col];
          this.setState({ map: map });
        }
      }
    }
  };

  visualizePath = async (path, type) => {
    return new Promise((resolve, reject) => {
      let loop = (i) => {
        setTimeout(() => {
          if (
            i < path.length &&
            ![1, 2].includes(this.state.map[path[i].x][path[i].y])
          ) {
            let tempMap = this.state.map;
            tempMap[path[i].x][path[i].y] = type;
            this.setState({ map: tempMap });
          } else {
            resolve();
          }
          loop(i + 1);
        }, 10);
      };
      loop(0);
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="dark"
          onClick={() => {
            let data = AStar(this.state.map);
            this.visualizePath(data[0], 4).then(() => {
              this.visualizePath(data[1], 5);
            });
          }}
        >
          A-Star
        </Button>
        <GridView
          map={this.state.map}
          updateNodes={this.updateNodes}
        ></GridView>
      </div>
    );
  }
}
