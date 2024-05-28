
const cardsArray = [
    {id: 1, name: "card1", img: "/memory-js/img/card1.jpg"},
    {id: 2, name: "card2", img: "/memory-js/img/card2.jpg"},
    {id: 3, name: "card3", img: "/memory-js/img/card3.jpg"},
    {id: 4, name: "card4", img: "/memory-js/img/card4.jpg"},
    {id: 5, name: "card5", img: "/memory-js/img/card5.jpg"},
    {id: 6, name: "card6", img: "/memory-js/img/card6.jpg"},
    {id: 7, name: "card7", img: "/memory-js/img/card7.jpg"},
    {id: 8, name: "card8", img: "/memory-js/img/card8.jpg"},
    {id: 9, name: "card9", img: "/memory-js/img/card1.jpg"},
    {id: 10, name: "card10", img: "/memory-js/img/card2.jpg"},
    {id: 11, name: "card11", img: "/memory-js/img/card3.jpg"},
    {id: 12, name: "card12", img: "/memory-js/img/card4.jpg"},
    {id: 13, name: "card13", img: "/memory-js/img/card5.jpg"},
    {id: 14, name: "card14", img: "/memory-js/img/card6.jpg"},
    {id: 15, name: "card15", img: "/memory-js/img/card7.jpg"},
    {id: 16, name: "card16", img: "/memory-js/img/card8.jpg"},
];

let gameGrid = cardsArray.concat(cardsArray).sort(function() {
  return 0.5 - Math.random();
});

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

let game = document.getElementById('game');
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  let name = item.name,
      img = item.img;


  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  let front = document.createElement('div');
  front.classList.add('front');

  let back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let match = function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

let resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  let clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});