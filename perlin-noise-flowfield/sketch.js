class Particle {
  constructor(color) {
    this.pos = createVector(random(width), random(height));
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.prevPos = this.pos.copy();
    this.c = color;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    let x = floor(this.pos.x / celllength);
    let y = floor(this.pos.y / celllength);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(this.c);
    strokeWeight(0.5);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  checkEdges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

let flowfield = [];
let particles = [];
let celllength = 10;
let xoff, yoff, zoff, rows, cols;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  zoff = 0;
  colorMode(HSB);
  //using golden angle to determine color
  let hue = random(25);
  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle(color(hue, 30, 100));
    hue = i * 137;
    hue = hue % 360;
  }
  rows = ceil(height / celllength) + 1;
  cols = ceil(width / celllength) + 1;
  flowfield = new Array(cols * rows);
  background(0);
}

function draw() {
  xoff = 0;
  for (let x = 0; x < cols; x++) {
    yoff = 0;
    for (let y = 0; y < rows; y++) {
      let index = cols * y + x;
      let v = p5.Vector.fromAngle(noise(xoff, yoff, zoff) * TWO_PI * 4);
      v.setMag(1);
      yoff += 0.1;
      flowfield[index] = v;
      push();
      translate(x * celllength, y * celllength);
      rotate(v.heading());
      pop();
    }
    xoff += 0.1;
    zoff += 0.0001;
  }

  //particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].checkEdges();
    particles[i].show();
  }
}
