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
  const [huristic, setHuristic] = useState('manhattan');
  const [algorithmWarning, toggleAlgorithmWarning] = useState(false);
  const [noPathWarning, toggleNoPathWarning] = useState(false);
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
          data = AStar(props.map, huristic);
          break;
      }
      if (!data) {
        toggleNoPathWarning(true);
      } else {
        toggleNoPathWarning(false);
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
              title={'Huristic: ' + huristic}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                eventKey={'1'}
                onClick={(e) => {
                  setHuristic('manhattan');
                }}
              >
                'Manhattan distance'
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey={'2'}
                onClick={(e) => {
                  setHuristic('euclidean');
                }}
              >
                "Euclidean distance"
              </NavDropdown.Item>
            </NavDropdown>
            <Button
              style={styles.resetBtn}
              size="sm"
              variant="primary"
              onClick={() => {
                if (!props.visualizationInProgress) props.buildMap();
              }}
            >
              Reset
            </Button>
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
    </>
  );
}
