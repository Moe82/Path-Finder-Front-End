import React, { Component } from 'react';

import GridView from '../views/GridView';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gridLength: 33,
			gridWidth: 26,
			nodes: [],
		};
	}
	componentDidMount = () => {
		let nodes = [];
		for (let column = 0; column < this.state.gridWidth; column++) {
			let rows = [];
			for (let row = 0; row < this.state.gridLength; row++) {
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
