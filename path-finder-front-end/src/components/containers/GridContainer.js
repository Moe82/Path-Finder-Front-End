import React, { Component } from 'react';

import GridView from '../views/GridView';
import Node from '../views/Node';

import StartNode from '../views/StartNode';
import EndNode from '../views/EndNode';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numCols: 50,
			numRows: 30,
			nodes: [],
		};
	}

	componentDidMount = () => {
		// construct an 2d array of nodes.
		let nodes = [];
		for (let row = 0; row < this.state.numRows; row++) {
			let currentColumn = [];
			for (let col = 0; col < this.state.numCols; col++) {
				currentColumn.push(<Node x={col} y={row} />);
			}
			nodes.push(currentColumn);
		}
		nodes[10][10] = <StartNode />;
		nodes[22][20] = <EndNode />;
		this.setState({ nodes });
	};

	render() {
		return <GridView nodes={this.state.nodes}></GridView>;
	}
}
