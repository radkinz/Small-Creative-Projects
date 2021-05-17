//set window take full screen
let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;

//constants
const mouse = {
  x: null,
  y: null
};

class Pizza {
  constructor(xx, yy) {
    this.x = xx;
    this.y = yy;
    this.size = 50;
    this.Vy = 2;
    this.img = new Image(this.size, this.size);
    this.img.src =
      "https://cdn.glitch.com/dbbb2cf0-5002-4c3a-b450-631c342cbb46%2Fpizza.jpg?v=1621204298653";
  }

  update() {
    this.y += this.Vy;
    this.size -= 0.5;
  }

  show() {
    if (this.size > 0) {
      let ctx = $("#canvas")
        .get(0)
        .getContext("2d");
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
  }
}

//initialize a pizza array and then add to it when the user mouse is down
let pizza = [];
let drawing = false;

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    pizza.push(new Pizza(mouse.x, mouse.y));
});



window.addEventListener("touchstart", function(event) {
  drawing = true;
  pizza.push(new Pizza(event.touches[0].clientX, event.touches[0].clientY));
});

window.addEventListener("touchmove", function(event) {
  if (drawing) {
    pizza.push(new Pizza(event.touches[0].clientX, event.touches[0].clientY));
  }
});

window.addEventListener("touchend", function(event) {
  drawing = false;
});

loop();

function loop() {
  //recall for a forever loop
  window.requestAnimationFrame(loop);

  //draw background to clear
  let ctx = $("#canvas")
    .get(0)
    .getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, c.width, c.height);
 
  for (let i = 0; i < pizza.length; i++) {
    pizza[i].show();
    pizza[i].update();
  }
  
  //check if need to clear arr
  for (let i = pizza.length-1; i >=0; i--) {
    if (pizza[i].size < 0) {
      pizza.splice(i, 1);
    }
  }
}
