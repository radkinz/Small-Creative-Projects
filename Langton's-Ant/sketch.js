class Cell {
  constructor(X, Y) {
    this.x = X;
    this.y = Y;
    this.cellcol = this.x / celllength;
    this.cellrow = this.y / celllength;
    this.on = true;
  }

  show() {
    if (this.on) {
      fill(255);
    } else {
      fill(0);
    }
    rect(this.x, this.y, celllength, celllength);
  }
}

class Ant {
  constructor(X, Y) {
    this.x = X;
    this.y = Y;
    this.direction = 1; //north=1, east=2, south=3, west=4
  }

  move() {
    //At a white square, turn 90° clockwise, flip the color of the square
    if (cell[this.x / celllength][this.y / celllength].on) {
      this.direction += 1;
      cell[this.x / celllength][this.y / celllength].on = false;
    } else if (!cell[this.x / celllength][this.y / celllength].on) {
      //At a black square, turn 90° counter-clockwise, flip the color of the square
      this.direction -= 1;
      cell[this.x / celllength][this.y / celllength].on = true;
    }

    //make dirrection stay in bound
    if (this.direction == 5) {
      this.direction = 1;
    }
    if (this.direction == 0) {
      this.direction = 4;
    }

    //move forward
    if (this.direction == 1) {
      this.y -= celllength;
    }
    if (this.direction == 2) {
      this.x += celllength;
    }
    if (this.direction == 3) {
      this.y += celllength;
    }
    if (this.direction == 4) {
      this.x -= celllength;
    }

    //make the ant wrap around if it goes out of bounds
    if (this.x >= width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width - celllength;
    }

    if (this.y >= height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height - celllength;
    }
    
    //show the ant
    fill(255, 0, 0);
    rect(this.x, this.y, celllength, celllength);
  }
}

let celllength = 25;
let col, row, ant;
var cell = [];

function setup() {
  cvn = createCanvas(
    roundtocelllength(windowWidth),
    roundtocelllength(windowHeight)
  );

  setup2D();

  ant = new Ant(roundtocelllength(width / 2), roundtocelllength(height / 2));
}

function draw() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].show();
    }
  }
  ant.move();
}

function roundtocelllength(value) {
  return floor(value / celllength) * celllength;
}

function setup2D() {
  col = width / celllength;
  row = height / celllength;
  for (let i = 0; i < col; i++) {
    cell[i] = [];
    for (let j = 0; j < row; j++) {
      cell[i][j] = new Cell((i * width) / col, (j * height) / row);
    }
  }
}
