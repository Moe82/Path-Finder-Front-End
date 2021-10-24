import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Alert,
} from 'react-bootstrap';
import AStar from '../algorithms/AStar';

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
  const [algorithmSelected, setAlgorithmSelected] = useState();
  const [algorithmWarning, toggleAlgorithmWarning] = useState(false);
  const visualize = () => {
    if (!algorithmSelected) {
      toggleAlgorithmWarning(true);
    }
    if (algorithmSelected === 'A-Star') {
      let data = AStar(props.map);
      props.visualizeAStar(data[0], 4).then(() => {
        props.visualizeAStar(data[1], 5);
      });
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
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item
                eventKey={'1227'}
                onClick={(e) => {
                  setAlgorithmSelected('A-Star');
                  toggleAlgorithmWarning(false);
                }}
              >
                A-Star
              </NavDropdown.Item>
            </NavDropdown>
            <Button
              style={styles.resetBtn}
              size="sm"
              variant="primary"
              onClick={() => {
                props.buildMap();
                setAlgorithmSelected(false);
              }}
            >
              Reset
            </Button>
            <Button
              style={styles.btn}
              size="sm"
              variant="primary"
              onClick={() => {
                if (props.visualizationInProgress) {
                  props.buildMap();
                  setAlgorithmSelected(false);
                } else visualize();
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
    </>
  );
}
