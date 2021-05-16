//set window take full screen
let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;

//constants
const objectSize = 20;
const width = window.innerWidth;
const height = window.innerHeight;

class Object {
  constructor(xx, yy, v, t) {
    this.x = xx;
    this.y = yy;
    this.velX = (Math.random() > 0.5 ? 1 : -1) * v;
    this.velY = (Math.random() > 0.5 ? 1 : -1) * v;
    this.type = t;
    this.img = new Image(objectSize, objectSize);
    this.r = objectSize / 2;
  }

  show() {
    let ctx = $("#canvas")
      .get(0)
      .getContext("2d");
    if (this.type == "rock") {
      this.img.src =
        "/Small-Creative-Projects/rock-paper-scissors-simulator/images/rock.png";
    }
    if (this.type == "paper") {
      this.img.src =
        "/Small-Creative-Projects/rock-paper-scissors-simulator/images/paper.jpg";
    }
    if (this.type == "scissors") {
      this.img.src =
        "/Small-Creative-Projects/rock-paper-scissors-simulator/images/scissors.png";
    }
    ctx.drawImage(this.img, this.x, this.y, objectSize, objectSize);
  }

  update() {
    //update speed
    this.x += this.velX;
    this.y += this.velY;

    //bounce off walls
    if (dist(this.x, this.y, this.x, height) < objectSize) {
      this.velY = -1 * this.velY;
    }
    if (dist(this.x, this.y, width, this.y) < objectSize) {
      this.velX = -1 * this.velX;
    }
    if (dist(this.x, this.y, this.x, 0) < objectSize) {
      this.velY = -1 * this.velY;
    }
    if (dist(this.x, this.y, 0, this.y) < objectSize) {
      this.velX = -1 * this.velX;
    }
    
    //bounce off each other
    for (let i = 0; i < object.length; i++) {
      if (object[i].x !== this.x && dist(this.x, this.y, object[i].x, object[i].y) < objectSize) { //make sure they are not the same object
        //swap velocityX
        let temp = this.velX;
        this.velX = object[i].velX;
        object[i].velX = temp;
        
        //swap velcityY
        temp = this.velY;
        this.velY = object[i].velY;
        object[i].velY = temp;
        
        //change type
        if (object[i].type == "rock" && this.type == "scissors" || object[i].type == "scissors" && this.type == "rock" ) {
          object[i].type = "rock";
          this.type = "rock";
        }
        if (object[i].type == "rock" && this.type == "paper" || object[i].type == "paper" && this.type == "rock" ) {
          object[i].type = "paper";
          this.type = "paper"
        }
        if (object[i].type == "paper" && this.type == "scissors" || object[i].type == "scissors" && this.type == "paper" ) {
          object[i].type = "scissors";
          this.type = "scissors";
        }
      }
    }
  }
}

let object = [25];
for (var i = 0; i < 25; i++) {
  object[i] = new Object(random(objectSize, width-objectSize), random(objectSize, height-objectSize), 3, randomType());
  
  //not spawn too close
  for (let j = 0; j < i-1; j++) {
    while(dist(object[i].x, object[i].y, object[j].x, object[j].y) < objectSize) {
      object[i] = new Object(random(0, width), random(0, height), 3, randomType());
    }
  }
}
loop();

function loop() {
  //recall for a forever loop
  window.requestAnimationFrame(loop);

  //draw background to clear
  let ctx = $("#canvas")
    .get(0)
    .getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  for (var i = 0; i < object.length; i++) {
    object[i].show();
    object[i].update();
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function dist(x1, y1, x2, y2) {
  let deltaX = Math.abs(x1 - x2);
  let deltaY = Math.abs(y1 - y2);
  let dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomType() {
  let val = randomInt(3);
  if (val == 0) {
    return "rock";
  } else if (val == 1) {
    return "paper";
  } else {
    return "scissors";
  }
}
