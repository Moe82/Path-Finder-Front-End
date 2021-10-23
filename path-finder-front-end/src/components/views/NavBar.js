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
  customButton: {
    backgroundColor: '#0B0C10',
    borderColor: '#78DCE8',
    color: '#78DCE8',
    borderRadius: '100px',
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
          <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
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
              style={styles.customButton}
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

// let data = AStar(this.state.map);
//             this.visualizePath(data[0], 4).then(() => {
//               this.visualizePath(data[1], 5);
//             });
