// Initial Data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: '',
};
let player = '';
let warning = '';
let playing = false;

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
})

// Functions
function itemClick(e){
  let item = e.target.getAttribute('data-item');
  if (square[item] === '' && playing){
    square[item] = player;
    renderSquare()
    togglePlayer()
  }
}

function togglePlayer(){
  player = (player === 'x') ? 'o' : 'x'
  renderInfo()
}

function reset(){
  warning = '';

  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';
  
  for(let i in square){
    square[i] = '';
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare(){
  for(let i in square){
    let item = document.querySelector(`div[data-item="${i}"]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function checkGame(){
  if (checkWinnerFor('x')){
    warning = 'X Venceu!';
    playing = false
  } else if (checkWinnerFor('o')){
    warning = 'O Venceu!';
    playing = false
  } else if (isFull()){
    warning = 'Empate!';
    playing = false
  }
}

function checkWinnerFor(player){
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for (let i in pos){
    let posArray = pos[i].split(',');
    let won = posArray.every(option => square[option] === player)

    if (won){
      return true
    }
  }

  return false
}

function isFull(){
  for(let i in square){
    if (square[i] === ''){
      return false;
    }
  }
  return true;
}

function renderInfo(){
  document.querySelector('.vez').innerHTML = player;
  document.querySelector('.resultado').innerHTML = warning;
}

reset();