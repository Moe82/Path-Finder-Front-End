import React, { Component } from 'react';

import GridView from '../views/GridView';

export default class Grid extends Component {
	constructor(props) {
		console.log('width:', window.innerWidth);
		console.log('height:', window.innerHeight);
		super(props);
		this.state = {
			numCols: 50,
			numRows: 30,
			nodes: [],
		};
	}
	componentDidMount = () => {
		let nodes = [];
		for (let column = 0; column < this.state.numRows; column++) {
			let rows = [];
			for (let row = 0; row < this.state.numCols; row++) {
				rows.push([]);
			}
			nodes.push(rows);
		}
		this.setState({ nodes });
	};

	render() {
		return <GridView nodes={this.state.nodes}></GridView>;
	}
}
