import React from 'react';

import Node from './Node';
import StartNode from './StartNode';
import EndNode from './EndNode';
import '../styles/Grid.css';

import { Container, Row, Col } from 'react-bootstrap';

const styles = {
	grid: {
		padding: '10%',
		paddingLeft: 40,
		paddingRight: 60,
	},
	row: {
		lineHeight: 0,
	},
};

function GridView(props) {
	return (
		<Container style={styles.grid}>
			{props.nodes.map((row, rowIndex) => {
				return (
					<Row key={rowIndex} style={styles.row}>
						<Col>
							{row.map((node, nodeIndex) => {
								return node;
							})}
						</Col>
					</Row>
				);
			})}
		</Container>
	);
	// return (
	// 	<Container style={styles.grid}>
	// 		{props.nodes.map((row, rowIndex) => {
	// 			return (
	// 				<Row key={rowIndex} style={styles.row}>
	// 					<Col>
	// 						{row.map((node, nodeIndex) => {
	// 							if (node == 1) return <StartNode x={rowIndex} y={nodeIndex} />;
	// 							else if (node == 2) return <EndNode />;
	// 							else if (node == 4) {
	// 								return (
	// 									<Node
	// 										updateNode={props.updateNode}
	// 										updateMultipleNode={props.updateMultipleNode}
	// 										x={rowIndex}
	// 										y={nodeIndex}
	// 										nodes={props.nodes}
	// 										backgroundColor={'yellow'}
	// 									/>
	// 								);
	// 							} else
	// 								return (
	// 									<Node
	// 										updateNode={props.updateNode}
	// 										updateMultipleNode={props.updateMultipleNode}
	// 										x={rowIndex}
	// 										y={nodeIndex}
	// 										nodes={props.nodes}
	// 									/>
	// 								);
	// 						})}
	// 					</Col>
	// 				</Row>
	// 			);
	// 		})}
	// 	</Container>
	// );
}

export default GridView;
