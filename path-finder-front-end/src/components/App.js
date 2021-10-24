import React, { Component } from 'react';
import { GridView, NavBar } from './views';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCols: 50,
      numRows: 50,
      // map is an simple array representation of all the nodes. A value of 0 represents a free path,
      // 1 represents the start node, 2 represents the end node, 3 represents a wall.
      map: [],
      visualizationInProgress: false,
    };
  }

  buildMap = () => {
    let map = [];
    for (let row = 0; row < this.state.numRows; row++) {
      let currentColumn = [];
      for (let col = 0; col < this.state.numCols; col++) {
        currentColumn.push(0);
      }
      map.push(currentColumn);
    }
    // set default locations for start and end nodes.
    let startNodeCoords = [1, 1];
    let endNodeCoords = [9, 9];
    map[startNodeCoords[0]][startNodeCoords[1]] = 1; // start node
    map[endNodeCoords[0]][endNodeCoords[1]] = 2; // end node
    this.setState({ map });
    this.setState({ visualizationInProgress: false });
  };

  componentDidMount = () => {
    this.buildMap();
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

  visualizeAStar = async (path, type) => {
    this.setState({ visualizationInProgress: true });
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
        <NavBar
          visualizeAStar={this.visualizeAStar}
          map={this.state.map}
          buildMap={this.buildMap}
          visualizationInProgress={this.state.visualizationInProgress}
        />
        <GridView
          map={this.state.map}
          updateNodes={this.updateNodes}
          visualizationInProgress={this.state.visualizationInProgress}
        ></GridView>
      </div>
    );
  }
}
