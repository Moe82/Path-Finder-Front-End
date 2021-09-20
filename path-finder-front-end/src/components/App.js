import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { GridView, Node, StartNode, EndNode } from './views';
import AStar from './algorithms/AStar';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numCols: 40,
			numRows: 40,
			nodes: [], // nodes is an array of Node components
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
		m[1][1] = 1; // start nde
		m[9][9] = 2; // end node
		this.setState({ map: m }, () => {
			// construct an 2d array of node .
			let nodes = [];
			for (let row = 0; row < this.state.numRows; row++) {
				let currentColumn = [];
				for (let col = 0; col < this.state.numCols; col++) {
					currentColumn.push(
						<Node
							key={[col, row]}
							x={row}
							y={col}
							backgroundColor={'#FFFFFF'}
							nodes={this.state.map}
							updateMultipleNode={this.updateMultipleNode}
						/>
					);
				}
				nodes.push(currentColumn);
			}
			nodes[9][9] = <EndNode x={9} y={9} />;
			nodes[1][1] = <StartNode x={1} y={1} />;
			this.setState({ nodes: nodes });
		});
	};

	updateSingleNode = (row, col, color) => {
		// "update" a single node by reconstructing a new one.
		let n = this.state.nodes;
		n[row][col] = (
			<Node
				Key={[col, row]}
				x={col}
				y={row}
				backgroundColor={color}
				updateNode={this}
			/>
		);
		this.setState({ nodes: n });
	};

	updateMultipleNode = (nodes) => {
		// when user drags over nodes, this function is called after the drage ends in order to
		// prevent the App component from re-rendering on every drag event.
		for (let row = 0; row < nodes.length; row++) {
			for (let col = 0; col < this.state.numCols; col++) {
				if (nodes[row][col] === 3) {
					let m = this.state.map;
					m[row][col] = 3;
					this.setState({ map: m });
				}
			}
		}
	};

	visualizePath = async (data, updateSingleNode, color) => {
		// await this.visualizeAlgorithm(
		// 	nodesChecked,
		// 	'yellow',
		// 	this.updateSingleNode
		// );

		// // (function loop(i) {
		// // 	setTimeout(function () {
		// // 		if (i < optimalPath.length) {
		// // 			updateSingleNode(optimalPath[i].x, optimalPath[i].y, color);
		// // 			console.log(i);
		// // 		}
		// // 		loop(i + 1);
		// // 	}, 10);
		// // })(0);
		// updateSingleNode(10, 10, 'blue');
		// updateSingleNode(11, 11, 'blue');
		// updateSingleNode(12, 12, 'blue');

		// console.log();
		let path = data[0];
		let nodesVisited = data[1];
		(function loop(i) {
			setTimeout(function () {
				if (i < path.length) {
					if (nodesVisited.includes(path[i])) {
						updateSingleNode(path[i].x, path[i].y, 'pink');
					} else updateSingleNode(path[i].x, path[i].y, 'blue');
				}
				loop(i + 1);
			}, 10);
		})(0);
	};

	render() {
		return (
			<div>
				<Button
					variant="dark"
					onClick={() => {
						let data = AStar(this.state.map);
						console.log(data);
						this.visualizePath(data, this.updateSingleNode, 'pink');
					}}
				>
					A-Star
				</Button>
				<GridView
					nodes={this.state.nodes}
					// map={this.state.map}
					updateNode={this.updateNode}
					updateMultipleNode={this.updateMultipleNode}
				></GridView>
			</div>
		);
	}
}
