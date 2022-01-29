// Initial Data
let currentColor = 'black';
let currentWeight = 5
let canDraw = false;
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Events
document.querySelectorAll('.colorArea').forEach(item =>{
  item.addEventListener('click', colorClickEv);
})
screen.addEventListener('mousedown', mouseDownEv);
screen.addEventListener('mousemove', mouseMoveEv);
screen.addEventListener('mouseup', mouseUpEv);
screen.addEventListener('mouseout', mouseUpEv);
document.querySelector('.range').addEventListener('input', rangeChangeEv);
document.querySelector('.clear').addEventListener('click', clearScreen)


// Functions
function colorClickEv(e) {
  let color = e.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  e.target.classList.add('active');
}

function rangeChangeEv(){
  currentWeight = document.querySelector('.range').value
  document.querySelector('.formArea span').innerHTML = currentWeight
}

function mouseDownEv(e){
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEv(e){
  if (canDraw){
    draw(e.pageX, e.pageY)
  }
}

function mouseUpEv(){
  canDraw = false;
}

function draw(x, y){
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = currentWeight
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen(){
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}