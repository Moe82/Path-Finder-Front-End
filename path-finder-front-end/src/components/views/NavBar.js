import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Alert,
} from 'react-bootstrap';
import { AStar, Dijkstra } from '../algorithms';

const styles = {
  btn: {
    backgroundColor: '#0B0C10',
    borderColor: '#78DCE8',
    color: '#78DCE8',
    borderRadius: '100px',
    marginLeft: '10px',
  },
  resetBtn: {
    backgroundColor: '#0B0C10',
    borderColor: '#F92672',
    color: '#F92672',
    borderRadius: '100px',
    marginLeft: '10px',
  },
  tittle: {
    color: '#78DCE8',
  },
};

export default function NavBar(props) {
  const [algorithmSelected, setAlgorithm] = useState();
  const [heuristic, setHeuristic] = useState('Manhattan');
  const [algorithmWarning, toggleAlgorithmWarning] = useState(false);
  const [noPathWarning, toggleNoPathWarning] = useState(false);
  const [visualizationStarted, toggleVisualizationStarted] = useState(false);
  const [nodesVisited, setNodesVisited] = useState();
  const [pathLength, setPathLength] = useState();
  const keyToAlgorithmMap = {
    1: 'A-Star',
    2: "Dijkstra's Algorithm",
    3: 'BFS',
  };

  const visualize = () => {
    let data;
    if (!algorithmSelected) {
      toggleAlgorithmWarning(true);
    } else {
      switch (algorithmSelected) {
        case keyToAlgorithmMap[1]:
          data = AStar(props.map, heuristic);
          setNodesVisited(data[0].length);
          setPathLength(data[1].length);
          break;
      }
      if (!data) {
        toggleNoPathWarning(true);
      } else {
        toggleNoPathWarning(false);
        toggleVisualizationStarted(true);
        props.visualizeAStar(data[0], 4).then(() => {
          props.visualizeAStar(data[1], 5).then(() => {
            props.toggleVisualizationInProgress(false);
          });
        });
      }
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={styles.tittle}>
            Pathfinding Visualizer
          </Navbar.Brand>
          <Nav className="me-auto">
            {visualizationStarted === false && (
              <>
                <NavDropdown
                  title={algorithmSelected ? algorithmSelected : 'Algorithms'}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey={'1'}
                    onClick={(e) => {
                      setAlgorithm(keyToAlgorithmMap[1]);
                      toggleAlgorithmWarning(false);
                    }}
                  >
                    {keyToAlgorithmMap[1]}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={'2'}
                    onClick={(e) => {
                      setAlgorithm(keyToAlgorithmMap[2]);
                      toggleAlgorithmWarning(false);
                    }}
                  >
                    {keyToAlgorithmMap[2]}
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={'Heuristic: ' + heuristic}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey={'1'}
                    onClick={(e) => {
                      setHeuristic('Manhattan');
                    }}
                  >
                    Manhattan distance
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={'2'}
                    onClick={(e) => {
                      setHeuristic('Euclidean');
                    }}
                  >
                    Euclidean distance
                  </NavDropdown.Item>
                </NavDropdown>
                <Button
                  style={styles.btn}
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    if (!props.visualizationInProgress) visualize();
                  }}
                >
                  Visualize
                </Button>
              </>
            )}
            <Button
              style={styles.resetBtn}
              size="sm"
              variant="primary"
              onClick={() => {
                if (!props.visualizationInProgress) {
                  props.buildMap();
                  toggleVisualizationStarted(false);
                }
              }}
            >
              Reset
            </Button>
          </Nav>
        </Container>
      </Navbar>
      {algorithmWarning && (
        <Alert variant="danger">
          <p style={{ textAlign: 'center' }}>Please Select an algorithm!</p>
        </Alert>
      )}
      {noPathWarning && (
        <Alert variant="danger">
          <p style={{ textAlign: 'center' }}>
            Make sure a path exists between the start and end node!
          </p>
        </Alert>
      )}
      {visualizationStarted && (
        <Alert variant="success">
          <p style={{ textAlign: 'center' }}>
            Algorithm: {algorithmSelected} &nbsp;&nbsp;&nbsp; Heuristic:{' '}
            {heuristic} &nbsp;&nbsp;&nbsp; Nodes Visited:{' '}
            {props.visualizationInProgress ? ' In Progress' : nodesVisited}{' '}
            &nbsp;&nbsp;&nbsp; Path Length:{' '}
            {props.visualizationInProgress ? ' In Progress' : pathLength}{' '}
            &nbsp;&nbsp;&nbsp;
          </p>
        </Alert>
      )}
    </>
  );
}
