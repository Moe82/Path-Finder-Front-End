import React from 'react';

import Node from './Node';
import '../styles/Grid.css';

import { Container, Row, Col } from 'react-bootstrap';

const styles = {
	grid: {
		paddingTop: '30%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	row: {
		lineHeight: 0,
	},
};

function GridView(props) {
	return (
		<Container style={styles.grid}>
			{props.nodes.map((row) => {
				return (
					<Row style={styles.row}>
						<Col>
							{row.map((node) => (
								<Node />
							))}
						</Col>
					</Row>
				);
			})}
		</Container>
	);
}

export default GridView;
