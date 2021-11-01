// TODO: code is very messy. Optimize before releasing.
function AStar(m, heuristic) {
  let nodesVisited = [];

  // object to represent each node on the map.
  function node(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id; // 0: free path, 1: start node, 2: end node, 3: wall
    this.neighbors = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.addNeighbors = function (map) {
      let x = this.x;
      let y = this.y;
      let row = map.length - 1;
      let col = map[0].length - 1;
      if (y > 0) this.neighbors.push(map[x][y - 1]);
      if (x > 0) this.neighbors.push(map[x - 1][y]);
      if (x < col) this.neighbors.push(map[x + 1][y]);
      if (y < row) this.neighbors.push(map[x][y + 1]);
    };
  }

  function heuristic(a, b) {
    if (heuristic === 'manhattan')
      return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
    else if (heuristic === 'euclidean')
      return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  function removeFromArray(array, elt) {
    // removes an element from a given array.
    for (var i = array.length - 1; i >= 0; i--)
      if (array[i] == elt) array.splice(i, 1);
  }

  let map = [];
  for (var i = 0; i < m.length; i++) {
    map.push([]);
    for (var j = 0; j < m[i].length; j++) {
      map[i][j] = m[i][j];
    }
  }
  /*
  Modify the elements of the map array to include information needed by the algorithm.
  The map array is transformed from a list of id's (see comment on line 6) to a list
  of nodes and a node is defined .
  */
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      map[i][j] = new node(i, j, map[i][j]);
    }
  }

  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      map[i][j].addNeighbors(map);
    }
  }

  let closedSet = [];
  let openSet = [];

  const findNodeByID = (id) => {
    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        if (map[x][y].id === id) return map[x][y];
      }
    }
  };

  let endNode = findNodeByID(2);
  let startNode = findNodeByID(1);
  let path = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let smallestFScoreIndex = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[smallestFScoreIndex].f)
        smallestFScoreIndex = i;
    }

    let current = openSet[smallestFScoreIndex];

    if (
      openSet[smallestFScoreIndex].x == endNode.x &&
      openSet[smallestFScoreIndex].y == endNode.y
    ) {
      // if this condition is met, return the array of nodes checked and the
      // array containing the shortest path form the startNode to the endNode.

      path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return [nodesVisited, path];
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && neighbor.id != 3) {
        var temp = current.g + heuristic(neighbor, current); // if value of 1 used, then the length of a diagonal path would be ~ 1.4
        var newPath = false;

        if (openSet.includes(neighbor)) {
          if (temp < neighbor.g) {
            neighbor.g = temp;
            newPath = true;
          }
        } else {
          neighbor.g = temp;
          openSet.push(neighbor);
          newPath = true;
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
          nodesVisited.push(neighbor);
        }
      }
    }
  }
}

export default AStar;
