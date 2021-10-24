import React, { useState } from 'react';
import Node from './Node';
import '../styles/Grid.css';
import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  grid: {
    padding: '1%',
    paddingLeft: 1,
    paddingRight: 1,
  },
  row: {
    lineHeight: 0,
  },
};

function GridView(props) {
  const [repositioningEndNode, setRepositioningEndNode] = useState(false);
  const [repositioningStartNode, setRepositioningStartNode] = useState(false);
  return (
    <Container style={styles.grid}>
      {props.map.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} style={styles.row}>
            <Col>
              {row.map((node, colIndex) => {
                return (
                  <Node
                    key={[colIndex, rowIndex]}
                    x={rowIndex}
                    y={colIndex}
                    type={node}
                    map={props.map}
                    updateNodes={props.updateNodes}
                    repositioningEndNode={repositioningEndNode}
                    setRepositioningEndNode={setRepositioningEndNode}
                    repositioningStartNode={repositioningStartNode}
                    setRepositioningStartNode={setRepositioningStartNode}
                    visualizationInProgress={props.visualizationInProgress}
                  />
                );
              })}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default GridView;
